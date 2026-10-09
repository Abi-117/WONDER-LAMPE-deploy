<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all editable program, contact, link, mentor, testimonial, and curriculum content in `src/lib/site-config.ts` so factual claims and conversion links have one source of truth.
- Store public registration submissions through the server function into the locked Cloud table; never expose submission reads to visitors.
