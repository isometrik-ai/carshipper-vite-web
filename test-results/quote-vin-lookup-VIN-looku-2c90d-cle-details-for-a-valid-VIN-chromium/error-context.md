# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - paragraph [ref=e3]: Something went wrong.
    - paragraph [ref=e4]: Failed to fetch
    - button "Try again" [ref=e5] [cursor=pointer]
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - alert [ref=e6]
  - generic [ref=e9] [cursor=pointer]:
    - img [ref=e10]
    - generic [ref=e12]: 1 error
    - button "Hide Errors" [ref=e13]:
      - img [ref=e14]
```