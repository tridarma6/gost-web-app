# gost.py
import base64
import struct
import smtplib
from email.mime.text import MIMEText

SBOX = [
    [4, 10, 9, 2, 13, 8, 0, 14, 6, 11, 1, 12, 7, 15, 5, 3],
    [14, 11, 4, 12, 6, 13, 15, 10, 2, 3, 8, 1, 0, 7, 5, 9],
    [5, 8, 1, 13, 10, 3, 4, 2, 14, 15, 12, 7, 6, 0, 9, 11],
    [7, 13, 10, 1, 0, 8, 9, 15, 14, 4, 6, 12, 11, 2, 5, 3],
    [6, 12, 7, 1, 5, 15, 13, 8, 4, 10, 9, 14, 0, 3, 11, 2],
    [4, 11, 10, 0, 7, 2, 1, 13, 3, 6, 8, 5, 9, 12, 15, 14],
    [13, 11, 4, 1, 3, 15, 5, 9, 0, 10, 14, 7, 6, 8, 2, 12],
    [1, 15, 13, 0, 5, 7, 10, 4, 9, 2, 3, 14, 6, 11, 8, 12]
]

def rotate_left(x, n):
    return ((x << n) | (x >> (32 - n))) & 0xFFFFFFFF

def f(x, k):
    temp = (x + k) & 0xFFFFFFFF
    out = 0
    for i in range(8):
        nibble = (temp >> (4 * i)) & 0xF
        out |= SBOX[i][nibble] << (4 * i)
    return rotate_left(out, 11)

def key_schedule(key_str):
    if len(key_str) != 32:
        raise ValueError("Kunci harus 32 karakter (256-bit)")
    return list(struct.unpack('<8I', key_str.encode()))

def split_block(block):
    return struct.unpack('<II', block)

def merge_block(L, R):
    return struct.pack('<II', L, R)

def pad(data):
    pad_len = 8 - (len(data) % 8)
    return data + bytes([pad_len] * pad_len)

def unpad(data):
    pad_len = data[-1]
    if pad_len < 1 or pad_len > 8 or data[-pad_len:] != bytes([pad_len] * pad_len):
        raise ValueError("Padding tidak valid.")
    return data[:-pad_len]

def gost_encrypt_block(block, subkeys):
    L, R = split_block(block)
    for i in range(32):
        k = subkeys[i % 8] if i < 24 else subkeys[7 - (i % 8)]
        L, R = R, L ^ f(R, k)
    return merge_block(R, L)

def gost_decrypt_block(block, subkeys):
    L, R = split_block(block)
    for i in range(32):
        k = subkeys[i % 8] if i < 8 else subkeys[7 - (i % 8)]
        L, R = R, L ^ f(R, k)
    return merge_block(R, L)

def gost_encrypt(plaintext, key):
    subkeys = key_schedule(key)
    plaintext = pad(plaintext.encode())
    blocks = [plaintext[i:i+8] for i in range(0, len(plaintext), 8)]
    cipher = b''.join([gost_encrypt_block(block, subkeys) for block in blocks])
    return base64.b64encode(cipher).decode('ascii')

def gost_decrypt(ciphertext_b64, key):
    subkeys = key_schedule(key)
    ciphertext = base64.b64decode(ciphertext_b64)
    blocks = [ciphertext[i:i+8] for i in range(0, len(ciphertext), 8)]
    decrypted = b''.join([gost_decrypt_block(block, subkeys) for block in blocks])

    try:
        clean = unpad(decrypted)
        return clean.decode('utf-8', errors='ignore')
    except Exception:
        return decrypted.decode('utf-8', errors='ignore')


def send_email(sender_email, app_password, to_email, subject, body):
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, app_password)
        server.send_message(msg)
