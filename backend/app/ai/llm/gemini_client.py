"""Gemini implementation of LlmProvider (Vertex AI). Wire when Gemini stage begins."""

# TODO: implement using google-generativeai / vertexai SDK.
# from vertexai.generative_models import GenerativeModel
#
# class GeminiClient:
#     def __init__(self, model_name: str = "gemini-2.5-pro") -> None:
#         self.model = GenerativeModel(model_name)
#
#     async def generate(self, prompt, *, system=None, temperature=0.2, max_tokens=2048) -> str: ...
#     async def generate_multimodal(self, prompt, images, *, system=None, temperature=0.2) -> str: ...
