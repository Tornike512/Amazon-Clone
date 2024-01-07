import triangle from "@src/assets/triangle.png";

export function LanguageChange() {
  return (
    <>
      <img className="triangle" src={triangle} alt="White Triangle" />
      <div className="language-change">
        <span className="language-change-text">
          Change language <a href="#">Learn more</a>
        </span>
        <div>
          <input type="checkbox" />
          <span>English - EN</span>
        </div>
        <div>
          <input type="checkbox" />
          <span>Deutsch - DE</span>
        </div>
      </div>
    </>
  );
}
