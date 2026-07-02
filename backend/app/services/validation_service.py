"""Stage-aware validation engine — SD/DD/GFC rulesets + RAG precedent lookup.

Flow:
1. Load stage-specific ruleset (from validation_rules catalog)
2. Pull DrawingElements for pdf_document_id
3. Run rules → produce ValidationFlag list (errors/cautions/suggestions)
4. For each flag: RAG retrieve standard detail + past precedents
5. Persist ValidationResult + ValidationFlag rows
6. Return report with source citations
"""

# TODO: implement.
