const SearchFormAdmin = ({ namaBarang, setNamaBarang, namaPembuat, setNamaPembuat, onSubmit }) => (
  <form onSubmit={onSubmit} className="my-3">
    <div className="mb-2">
      <input
        type="text"
        placeholder="Cari nama barang..."
        className="form-control"
        value={namaBarang}
        onChange={(e) => setNamaBarang(e.target.value)}
      />
    </div>
    <div className="mb-2">
      <input
        type="text"
        placeholder="Cari nama pembuat..."
        className="form-control"
        value={namaPembuat}
        onChange={(e) => setNamaPembuat(e.target.value)}
      />
    </div>
    <button className="btn btn-primary" type="submit">Cari</button>
  </form>
);

export default SearchFormAdmin;