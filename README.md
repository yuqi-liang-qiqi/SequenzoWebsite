<h1 align="center">Sequenzo Docs</h1>


**Sequenzo Docs** is the official documentation website for the Sequenzo project. It provides comprehensive guides, tutorials, and resources for developers and users to get started with Sequenzo.

The website is developed based on [Vitepress](https://github.com/vuejs/vitepress).

## Pre-requisites

To develop the website locally, you need to have the following installed on your machine:

- [Node.js 22+](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)

## Getting Started

Inside the project root directory, run the following commands:

```bash
# 1. install dependencies
pnpm install

# 2. start the local development server
pnpm dev
```

Then open your browser and visit `http://localhost:5173/en` to view the website.

## Writing the Docs

To add or edit the documentation content, you can modify the markdown files in the `docs` directory. The website will automatically update the content when you save the changes.

To change the sidebar, you can modify `en.ts` and `zh.ts` files in the `docs/.vitepress` directory.

For more information on how to write markdown files, refer to the [Vitepress documentation](https://vitepress.dev/).

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

1. **Fork the Repository**.
2. **Create a New Branch**:

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Commit Your Changes**:

   ```bash
   git commit -am 'Add some feature'
   ```

4. **Push to the Branch**:

   ```bash
   git push origin feature/your-feature
   ```

5. **Open a Pull Request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
