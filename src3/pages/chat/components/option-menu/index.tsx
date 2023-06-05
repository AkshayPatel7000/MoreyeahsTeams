import { useState } from "react";
import Icon from "common/components/icons";
import useCloseMenu from "../../hooks/useCloseMenu";
import { Container, Button, Options, Option } from "./styles";
import { Auth_Store } from "store/auth.store";
import { useNavigate } from "react-router-dom";

type OptionsMenuProps = {
  iconClassName?: string;
  className?: string;
  iconId: string;
  ariaLabel?: string;
  options: string[];
  position?: string;
  showPressed?: boolean;
  [x: string]: any;
};

export default function OptionsMenu(props: OptionsMenuProps) {
  const navigation = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const ref = useCloseMenu(() => setShowOptions(false));
  const {
    iconId,
    options,
    ariaLabel,
    className,
    iconClassName,
    position = "left",
    showPressed = true,
  } = props;

  const getBtnClassName = (): string => {
    let _className = showOptions && showPressed ? "btn-pressed " : "";
    _className += className ?? "";

    return _className;
  };

  const getOptionsClassName = (): string => {
    let className = showOptions ? "active " : "";
    className += position === "right" ? "right" : "";

    return className;
  };

  const handleClick = () => {
    setShowOptions(!showOptions);
  };
  const onoptionPress = (e) => {
    if (e === "Log out") {
      localStorage.clear();
      Auth_Store.logout();
      window.sessionStorage.clear();
      window.location.reload();
    }
  };
  return (
    <Container ref={ref}>
      <Button aria-label={ariaLabel} className={getBtnClassName()} onClick={handleClick}>
        <Icon id={iconId} className={iconClassName} />
      </Button>
      <Options className={getOptionsClassName()}>
        {options.map((option) => (
          <Option key={option} onClick={() => onoptionPress(option)}>
            {option}
          </Option>
        ))}
      </Options>
    </Container>
  );
}
