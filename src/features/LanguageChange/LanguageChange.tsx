import triangle from "@src/assets/triangle.png";

export function LanguageChange() {
  return (
    <>
      <img className="triangle" src={triangle} alt="White Triangle" />
      <div className="language-change">
        <span>
          Change language <a href="#">Learn more</a>
        </span>
        <span>
          <input type="checkbox" />
          <span>English - EN</span>
        </span>
        <span>
          <input type="checkbox" />
          <span>Deutsch - DE</span>
        </span>
      </div>
    </>
  );
}
