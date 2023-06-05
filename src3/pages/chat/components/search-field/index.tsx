import Icon from "common/components/icons";
import { SearchWrapper, IconContainer, Input } from "./styles";
import { useCallback, useRef, useState } from "react";
import { SearchUser } from "services/Firebase/User.service";

type SearchFieldProps = {
  placeholder?: string;
  [x: string]: any;
};

export default function SearchField(props: SearchFieldProps) {
  const { placeholder, ...rest } = props;
  const [search, setSearch] = useState("");
  const inputRef = useRef();
  const onClear = () => {
    setSearch("");
    console.log("first", inputRef.current);
  };
  // const debounce = (func, wait) => {
  //   let timeout;

  //   return (...args) => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func(...args), wait);
  //   };
  // };
  // const handleSearch = useCallback(
  //   debounce((inputVal) => onSearch(inputVal), 500),
  //   []
  // );
  const onSearch = async () => {
    await SearchUser(search);
    // setSearch(e);
  };
  return (
    <SearchWrapper {...rest}>
      <IconContainer>
        <Icon id="search" className="search-icon" />
        <button className="search__back-btn" onClick={onClear}>
          <Icon id="back" />
        </button>
      </IconContainer>
      <Input
        ref={inputRef}
        placeholder={placeholder ?? "Search or start a new chat"}
        onKeyDown={(e) => {
          e.keyCode === 13 && onSearch();
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchWrapper>
  );
}
