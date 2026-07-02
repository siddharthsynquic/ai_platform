"""Validation pipeline: fetch drawing → apply stage ruleset → RAG-ground flags → report.

Steps:
1. Load PdfDocument + DrawingElements + Chunks
2. ValidationService.apply_rules(stage)
3. For each flag: VectorService.search(standard_details + past drawings, filtered by stage)
4. LlmProvider.generate → author natural-language explanation with citations
5. Persist ValidationResult + emit dashboard event
"""

# TODO: implement.
