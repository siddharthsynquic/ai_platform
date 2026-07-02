"""Drawing element extraction — rooms, dimensions, tags, schedules, details.

Strategy:
1. Rasterize page(s) at high DPI.
2. Send image + prompt to Gemini multimodal (LlmProvider.generate_multimodal).
3. Prompt asks for structured JSON: {rooms, dimensions, tags, symbols, schedules}.
4. Combine with OCR bbox data for spatial grounding.
5. Persist DrawingElement rows.
"""

# TODO: implement.
