"""Stage classifier — infers SD / DD / GFC from PDF content.

Signals to combine:
- Title block keywords ("Schematic", "Design Development", "GFC", "Working Drawing")
- Presence of dimensions (SD usually lacks, GFC dense)
- Line weight / drafting density heuristics
- Revision codes
- Confidence score returned; low confidence → prompt user

Fallback: Gemini text+vision classifier.
"""

# TODO: implement.
