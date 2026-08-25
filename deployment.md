Deployment & Rollback Evidence
Deployment
Recommended deployment target: GitHub Pages.
Deployment steps
Push the project to a public GitHub repository.
Open repository Settings → Pages.
Select Deploy from a branch.
Select main and / (root).
Save the configuration.
Verify the published URL.
Rollback evidence
Git preserves previous versions of the project.
Example rollback workflow:
git log --oneline
git checkout <previous-commit>
For a real rollback, restore the desired commit on the main branch and push it:
git checkout main
git revert <commit-hash>
git push origin main
Before submission, add a screenshot of your GitHub commit history or deployment history here as evidence.
Submission checklist
[ ] Public GitHub repository
[ ] GitHub Pages deployment configured
[ ] Live URL tested
[ ] Commit/deployment history screenshot added
[ ] README included
[ ] LinkedIn post completed