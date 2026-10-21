# NEWS REFRESH task — runs ~25 min before the 12:30 and 19:30 (Prague) news slots

Purpose: make sure a scheduled NEWS post shows the freshest facts when it goes live. Work autonomously. Report in 1-2 Czech sentences.

1) Call Metricool getScheduledPosts (brandId 7489774, timezone Europe/Prague, fromDate = now, toDate = now + 90 minutes, ISO with offset such as 2026-10-21T12:00:00+02:00). Keep posts whose text starts with "NEWS:". If none: report "no news post due" and stop.
2) For each such post find its folder in the repo earnedmilesHQ/posts under n/: the raw.githubusercontent media URLs of the original media are not kept by Metricool (it copies them), so match by caption: read n/*/spec.json (newest folders first) and match "caption". Read spec.json (facts[], story, sources, caption). If no folder matches, only re-check facts and report; do not change the post.
3) Re-check every fact: use WebSearch/WebFetch to read the newest numbers/state (live standings, results, launch status, prices). Compare with facts[].
4) If nothing material changed: report "still current" and stop (do not touch the post).
5) If something changed (new standings/numbers, a result is out, a drop changed, a correction): edit spec.json (update texts, the as-of time/day in title/hook/caption, facts, sources), render with tools/news/news.js (see README.md; run npm install in tools/news first), QA the PNGs with the Read tool, convert to JPG into a NEW folder n/<folder>-r1/ (copy spec.json there), commit and push (attribution lines from the system reminder), verify the raw URLs return 200, then call Metricool updateScheduledPost for that post (load its schema with ToolSearch if needed) with the new media URLs, the new caption text (same tagging rules as TASK.md: only verified handles) and the SAME publication time. Metricool re-copies the images.
6) If the story is now obsolete or wrong (e.g. the event ended and a final result exists), rewrite the post as the final RESULT version in the same way. Never leave a post that states outdated numbers as current.
7) Report what changed.
