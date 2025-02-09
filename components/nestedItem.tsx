import { fontSizes, SubItem } from "@/app/types/types";
import { useThemeContext } from "@/app/hooks/useThemeContext"; // Import the ThemeContext
import localFont from "next/font/local"

const uthmani = localFont({
  src: "../public/fonts/uthmani.otf",
  display: "swap",
})

interface NestedItemProps {
  subItem: SubItem; // Gunakan tipe SubItem
}

const NestedItem: React.FC<NestedItemProps> = ({ subItem }) => {
  const {  fontSize, latinVisible, translationVisible } =
    useThemeContext(); // Access the theme, fontSize, latinVisible, and translationVisible from context
  const selectedFontSize =
    fontSizes.find((size) => size.value === fontSize) || fontSizes[1]; // Default to medium if fontSize is not set

  return (
    <div className="mb-2">
      <h3
        className={`text-md font-medium `}
      >
        {subItem.title}
      </h3>

      {/* Arabic text with dynamic font size */}
      <p
        className={`leading-relaxed text-right ${uthmani.className} ${
          selectedFontSize.size
        } `}
      >
        {subItem.arabic}
      </p>

      {/* Conditionally show Latin text based on latinVisible */}
      {latinVisible && subItem.latin && (
        <p
          className={`italic `}
        >
          {subItem.latin}
        </p>
      )}

      {/* Conditionally show translation text based on translationVisible */}
      {translationVisible && subItem.translation && (
        <p
          className={``}
        >
          {subItem.translation}
        </p>
      )}
    </div>
  );
};

export default NestedItem;