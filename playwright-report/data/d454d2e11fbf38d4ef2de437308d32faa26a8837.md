# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "GlamRent" [ref=e4] [cursor=pointer]:
        - /url: /
      - navigation [ref=e5]:
        - link "Browse" [ref=e6] [cursor=pointer]:
          - /url: /search
        - link "How it works" [ref=e7] [cursor=pointer]:
          - /url: /#how
        - link "Featured" [ref=e8] [cursor=pointer]:
          - /url: /#featured
        - link "FAQ" [ref=e9] [cursor=pointer]:
          - /url: /faq
      - generic [ref=e10]:
        - link "Admin" [active] [ref=e11] [cursor=pointer]:
          - /url: /admin/login
        - link "Become a lender" [ref=e12] [cursor=pointer]:
          - /url: /become-a-lender
  - button "Open Next.js Dev Tools" [ref=e18] [cursor=pointer]:
    - img [ref=e19]
  - alert [ref=e22]
  - generic [ref=e23]:
    - heading "Iniciar sesión administrador" [level=1] [ref=e24]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - generic [ref=e27]: Usuario
        - textbox "Usuario" [ref=e28]: admin
      - generic [ref=e29]:
        - generic [ref=e30]: Contraseña
        - textbox "Contraseña" [ref=e31]: admin123
      - button "Iniciar sesión" [ref=e32]
      - paragraph [ref=e33]: Área protegida. Solo personal autorizado.
```