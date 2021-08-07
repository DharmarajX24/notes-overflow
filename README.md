**NotesOVERFLOW**
is an open-source service that allows users to upload images and search for them based on text at a later date, ideal for a student who has too many notes to track.

LIVE DEMO: https://no.dharmaraj.tech/


Requirements:
**Supabase:** Auth & Database
Start a project here: https://supabase.io/database

**MeiliSearch:** Dedicated host to process and store the meilisearch data and images
Documentation:  https://docs.meilisearch.com/

**Google Cloud Project:** Service account with Vision API access
Documentation: https://cloud.google.com/vision/docs/setup

Link your Supabase credentials inside a `.env` file, use the `.env.example` as a base
Repeat this for the Server with the GCP Service account and MeiliSearch

