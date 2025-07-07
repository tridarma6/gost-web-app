# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from gost import gost_encrypt, gost_decrypt, send_email

app = Flask(__name__)
CORS(app)

@app.route("/encrypt", methods=["POST"])
def encrypt():
    try:
        data = request.json
        text = data.get("text")
        key = data.get("key")

        if not text or not key:
            return jsonify({"error": "chipertext dan and are required"}), 400

        result = gost_encrypt(text, key)
        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/decrypt", methods=["POST"])
def decrypt():
    try:
        data = request.json
        text = data.get("text")
        key = data.get("key")

        if not text or not key:
            return jsonify({"error": "chipertext dan and are required"}), 400

        result = gost_decrypt(text, key)
        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/encrypt-email", methods=["POST"])
def encrypt_and_send_email():
    data = request.json
    text = data.get("text")
    key = data.get("key")
    to_email = data.get("to_email")
    sender = data.get("sender_email")
    app_pw = data.get("app_password")

    result = gost_encrypt(text, key)
    send_email(sender, app_pw, to_email, "Result Encryption GOST", result)

    return jsonify({"result": result, "message": "Email has sent"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
