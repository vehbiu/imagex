# ImageX - Image Converter

![NextJs](https://img.shields.io/badge/Next-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A browser-based image converter that allows you to convert images to various formats without any ads or servers—ensuring your privacy.

## 🌟 Features

- **Multiple Format Support**: Convert images to PNG, JPEG, WebP, AVIF, BMP, and ICO.
- **Responsive Design**: Works seamlessly on all devices.
- **Privacy First**: All processing happens locally in your browser.
- **User-Friendly Interface**: Intuitive controls for file uploads, format selection, and resizing.
- **Download History**: Keep track of your recent conversions.

## 🚀 Demo

Try it out live at [imagex.vehbi.me](https://imagex.vehbi.me)

<!-- ![Website Preview](https://via.placeholder.com/800x400.png?text=Image+Converter+Preview) -->

## 🛠️ Technologies Used

- React (via NextJS)
- TypeScript
- TailwindCSS
- Lucide Icons
- FileSaver.js

## ⚙️ Installation

1. Clone the repository
   ```bash
   git clone https://github.com/vehbiu/imagex.git
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Start the development server
   ```bash
   bun run dev
   ```

## 📁 Project Structure
```
src/
├── components/
│   ├── ui/                  # UI components
│   └── download-history.tsx # Download history component
├── app/
│   ├── page.tsx             # Main conversion page
│   └── layout.tsx           # Default layout
├── lib/
│   ├── types.ts             # Type definitions
│   └── utils.ts             # Utility functions (shadcn)
├── App.tsx                  # Main application component
└── ...
```

## 🎨 Customization

### Adding New Formats

To add support for a new image format, modify the format options in the `Select` component within `image-converter.tsx`:

```typescript
<SelectItem value="newformat">New Format</SelectItem>
```
> ⚠️ Warning
Canvas does not support all image formats. Make sure to test the new format thoroughly before adding it to the list.

### Updating Styles

Modify the styles in `tailwind.config.js` to customize the appearance of the UI components.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vehbiu/imagex/issues).

## 👤 Author

**Vehbi**

- Website: [vehbi.me](https://vehbi.me)
- GitHub: [@vehbiu](https://github.com/vehbiu)

## 🙏 Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- File handling library: [FileSaver.js](https://github.com/eligrey/FileSaver.js/)

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/vehbiu/imagex?style=social)
![GitHub forks](https://img.shields.io/github/forks/vehbiu/imagex?style=social)

---

Made with ❤️ by [@vehbiu](https://github.com/vehbiu)
