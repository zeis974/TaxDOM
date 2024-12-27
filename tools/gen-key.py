#!/usr/bin/env python3
import base64
import os
import datetime
import jwt
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey

privkey = Ed25519PrivateKey.generate()
pubkey = privkey.public_key()

pubkey_pem = pubkey.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo,
)

pubkey_base64 = base64.urlsafe_b64encode(
    pubkey.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw,
    )
).decode("utf-8").rstrip("=")

with open("jwt_key.pem", "wb") as pem_file:
    pem_file.write(pubkey_pem)

with open("jwt_key.base64", "w") as base64_file:
    base64_file.write(pubkey_base64)

now = datetime.datetime.now(datetime.timezone.utc)
exp = now + datetime.timedelta(days=3)

rw_claims = {
    "sub": "user_rw",
    "scope": "read-write",
    "iat": int(now.timestamp()),
    # "exp": int(exp.timestamp()), # Disable expiration
}

ro_claims = {
    "sub": "user_ro",
    "scope": "read-only",
    "iat": int(now.timestamp()),
    # "exp": int(exp.timestamp()), # Disable expiration
}

privkey_pem = privkey.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption(),
)

rw_token = jwt.encode(rw_claims, privkey_pem, algorithm="EdDSA")
ro_token = jwt.encode(ro_claims, privkey_pem, algorithm="EdDSA")

with open("jwt_rw_token.txt", "w") as rw_file:
    rw_file.write(rw_token)

with open("jwt_ro_token.txt", "w") as ro_file:
    ro_file.write(ro_token)

print("Clé publique Ed25519 générée :")
print(f"  - Format PEM : jwt_key.pem")
print(f"  - Format Base64 URL-safe : jwt_key.base64")
print("\nTokens JWT générés :")
print(f"  - Lecture/écriture : jwt_rw_token.txt")
print(f"  - Lecture seule : jwt_ro_token.txt")