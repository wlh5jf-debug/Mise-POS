export default function Pinpad({ value, onChange }) {
  function handleNumberClick(number) {
    onChange(value + number);
  }

  function handleBackspace() {
    onChange(value.slice(0, -1));
  }

  function handleClear() {
    onChange("");
  }

  return (
    <div className="pinpad">
      <div className="pinpad-display">
        {"•".repeat(value.length)}
      </div>

      <div className="pinpad-grid">
        {[1,2,3,4,5,6,7,8,9].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleNumberClick(num.toString())}
          >
            {num}
          </button>
        ))}

        <button type="button" onClick={handleClear}>Clear</button>
        <button type="button" onClick={() => handleNumberClick("0")}>0</button>
        <button type="button" onClick={handleBackspace}>⌫</button>
      </div>
    </div>
  );
}