import { h, render, Component } from "preact";
import Icon from "../../icon";
import Button from "../../button";
import "./style.css";
export default function WindowButtons({
  buttons = "minimize maximize close",
  onClose,
  onMinimize,
  toggleState,
  isMaximized = false
}) {
  const allowedButtons = buttons.split(" ");
  return (
    <div class="ui95__window-buttons" onTouchStart={e => e.stopPropagation()}>
      {allowedButtons.includes("minimize") && (
        <Button classNames="titlebar minimize" onClick={onMinimize}>
          <Icon size="custom" name="window-minimize" title="Minimize" />
        </Button>
      )}
      {allowedButtons.includes("maximize") && (
        <Button
          classNames="titlebar maximize"
          onClick={() => toggleState("isMaximized")}
          ariaHidden
        >
          {isMaximized ? (
            <Icon size="custom" name="window-restore" title="Restore" />
          ) : (
            <Icon size="custom" name="window-maximize" title="Maximize" />
          )}
        </Button>
      )}
      {allowedButtons.includes("close") && (
        <Button classNames="titlebar close" onClick={onClose}>
          <Icon size="custom" name="window-close" title="Close" />
        </Button>
      )}
    </div>
  );
}