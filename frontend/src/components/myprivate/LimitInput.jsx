const LimitInput = ({ limit, setLimit, setPage }) => (
  <div className="mb-2">
    <label htmlFor="limit" className="form-label">Tampilkan jumlah data:</label>
    <input
      type="number"
      id="limit"
      min={1}
      value={limit === 0 ? '' : limit}
      onChange={(e) => {
        const val = e.target.value;
        if (val === '') setLimit(0);
        else {
          const number = parseInt(val);
          if (!isNaN(number)) {
            setLimit(number);
            setPage(1);
          }
        }
      }}
      onBlur={() => {
        if (!limit || limit < 1) setLimit(1);
      }}
      className="form-control"
      style={{ width: '100px' }}
    />
  </div>
);

export default LimitInput;