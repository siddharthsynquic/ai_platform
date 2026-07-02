"""Password hashing — Argon2id (memory-hard, industry standard 2025).

Add `argon2-cffi` to dependencies before wiring.
"""

from typing import Protocol


class PasswordHasher(Protocol):
    def hash(self, password: str) -> str: ...
    def verify(self, hashed: str, password: str) -> bool: ...


# TODO: implement using argon2-cffi.
# from argon2 import PasswordHasher as Argon2Hasher, exceptions
#
# class Argon2PasswordHasher:
#     def __init__(self) -> None:
#         self._hasher = Argon2Hasher(
#             time_cost=3, memory_cost=65536, parallelism=4, hash_len=32, salt_len=16
#         )
#
#     def hash(self, password: str) -> str:
#         return self._hasher.hash(password)
#
#     def verify(self, hashed: str, password: str) -> bool:
#         try:
#             return self._hasher.verify(hashed, password)
#         except exceptions.VerifyMismatchError:
#             return False
