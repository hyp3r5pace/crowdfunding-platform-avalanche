export default function CategoryComponent(props) {
  const onClickFilter = (val) => {
    if(props.filter !== val) {
      props.changeCategory(val);
    } else {
      props.changeCategory(-1);
      document.getElementsByClassName('categoryItem')[val].blur();
    }
  }
  return (
    <div className="category">
      <div className="categoryItem" tabIndex='1' onClick={() => onClickFilter(0)}>{"Design & tech"}</div>
      <div className="categoryItem" tabIndex='1' onClick={() => onClickFilter(1)}>Film</div>
      <div className="categoryItem" tabIndex='1' onClick={() => onClickFilter(2)}>Arts</div>
      <div className="categoryItem" tabIndex='1' onClick={() => onClickFilter(3)}>Games</div>
    </div>
  );
}
