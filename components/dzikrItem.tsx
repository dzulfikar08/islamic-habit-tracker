import { useThemeContext } from "@/app/hooks/useThemeContext";
import { DzikirItemType, fontSizes, SubItem } from "../app/types/types";
import NestedItem from "./nestedItem";
import { Amiri } from 'next/font/google'
import localFont from "next/font/local"

const uthmani = localFont({
  src: "../public/fonts/uthmani.otf",
  display: "swap",
})

const amiri = Amiri({
  subsets: ['arabic'],
  weight: '400',
})


interface DzikirItemProps {
  item: DzikirItemType; // Gunakan tipe DzikirItemType
  index: number;

  showNumber: boolean[];
}

const DzikirItem: React.FC<DzikirItemProps> = ({
  item,
  index,

  showNumber,

}) => {
  const {  fontSize, translationVisible, latinVisible } =
    useThemeContext(); // Access the theme, fontSize, translationVisible, and latinVisible from context

  const selectedFontSize =
    fontSizes.find((size) => size.value === fontSize) || fontSizes[1]; // Default to Medium

  return (
    <div
      className={`mb-6 p-4 rounded-lg shadow-lg border hover:shadow-xl bg-primary-foreground `}
    >
      <h2
        className={`text-lg font-semibold mb-2 `}
      >
        {item.title}
      </h2>

      {/* Arabic text with dynamic font size */}
      {item.arabic && (
        <p
          className={`leading-relaxed text-right ${uthmani.className} ${
            selectedFontSize.size
          } `}
        >
          {item.arabic}
        </p>
      )}

      {/* Conditionally show Latin text */}
      {latinVisible && item.latin && (
        <p
          className={`italic mt-1 `}
        >
          {item.latin}
        </p>
      )}

      {/* Conditionally show translation text */}
      {translationVisible && item.translation && (
        <p
          className={`mt-1 `}
        >
          {item.translation}
        </p>
      )}

      {/* Display nested items if available */}
      {item.data && (
        <div
          className={`mt-4 pl-4 border-l-2 `}
        >
          {item.data.map((subItem: SubItem, subIndex: number) => (
            <NestedItem key={subIndex} subItem={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DzikirItem;