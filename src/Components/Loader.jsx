import classnames from 'classnames';
const Loader = ({
  show = false,
  text = "Loading",
  side = 40,
}) => {

  const containerSize = {
    width: side,
    height: side,
  };

  return (
    <div className={classnames("loaderBackdrop", { "visible": show })}>
      <div className={"loaderContainerWrapper"}>
        <div className={"loaderContainer"} style={containerSize}>
          <div
            className={"loaderInnerContainer"}
            style={containerSize}
          ></div>
        </div>
        <span className={"loaderText"}>{text}</span>
      </div>
    </div>
  );
};

export default Loader;
