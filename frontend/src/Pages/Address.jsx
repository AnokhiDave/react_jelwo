import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Addresses() {
  const navigate = useNavigate();

  const initialForm = {
    FirstName: "",
    LastName: "",
    Company: "",
    Address1: "",
    Address2: "",
    City: "",
    Country: "India",
    PostalCode: "",
    Phone: "",
    IsDefault: false,
  };

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ================= FETCH ================= */
  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/addresses",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAddresses(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        Swal.fire("Session Expired", "Please login again", "warning");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchAddresses();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
    setShowForm(false);
  };

  /* ================= ADD / UPDATE ================= */
  const submitAddress = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/addresses/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire("Updated", "Address updated successfully", "success");
      } else {
        await axios.post(
          "http://localhost:5000/api/addresses",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire("Added", "Address added successfully", "success");
      }

      resetForm();
      fetchAddresses();
    } catch (err) {
      console.error("Submit Error:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        Swal.fire("Session Expired", "Please login again", "warning");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  /* ================= EDIT ================= */
  const editAddress = (a) => {
    setForm({
      FirstName: a.FirstName,
      LastName: a.LastName,
      Company: a.Company,
      Address1: a.Address1,
      Address2: a.Address2,
      City: a.City,
      Country: a.Country,
      PostalCode: a.PostalCode,
      Phone: a.Phone,
      IsDefault: Boolean(a.IsDefault),
    });
    setEditId(a.AddressID);
    setShowForm(true);
  };

  /* ================= DELETE ================= */
  const deleteAddress = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/addresses/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAddresses();
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        Swal.fire("Session Expired", "Please login again", "warning");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (
    <>
      <style>{`
        .profile-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .profile-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .profile-header-content {
          position: relative;
          z-index: 1;
        }

        .breadcrumb-text {
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .profile-header h1 {
          font-family: "Playfair Display", serif;
          font-size: 48px;
        }

        .address-page { margin: 60px auto; }

        .saved-address {
          background: #f7f2ed;
          padding: 25px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
        }

        .addr p {
          margin: 4px 0;
          font-size: 16px;
        }

        .name {
          font-weight: 600;
          margin-top: 8px;
        }

        .actions button {
          margin-left: 10px;
        }

        .add-new-box {
          background: #f7f2ed;
          padding: 45px;
          text-align: center;
          margin: 40px 0;
          cursor: pointer;
        }

        .address-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 14px;
          margin-bottom: 6px;
          font-weight: 500;
        }

        input, select {
          padding: 12px;
          border: 1px solid #ccc;
        }

        .primary-btn {
          background: black;
          color: white;
          padding: 12px 25px;
          border: none;
        }

        .link-btn {
          background: none;
          border: 1px solid #ddd;
          padding: 6px 12px;
          cursor: pointer;
        }
      `}</style>

      <section className="profile-header">
        <div className="profile-header-content">
          <div className="breadcrumb-text">HOME - ADDRESS</div>
          <h1>Address</h1>
        </div>
      </section>

      <div className="container address-page">
        <h2 style={{ textAlign: "center" }}>Your addresses</h2>
        <a href="/Profile">Return to account details</a>

        {addresses.length === 0 && (
          <div className="saved-address">
            <div className="addr">
              <strong>(Default)</strong>
              <p>India</p>
            </div>
          </div>
        )}

        {addresses.map((a) => (
          <div key={a.AddressID} className="saved-address">
            <div className="addr">
              {Number(a.IsDefault) === 1 && <strong>(Default)</strong>}
              <p className="name">{a.FirstName} {a.LastName}</p>
              <p>{a.Company}</p>
              <p>{a.Address1}</p>
              <p>{a.Address2}</p>
              <p>{a.City}</p>
              <p>{a.PostalCode}</p>
              <p>{a.Country}</p>
              <p>{a.Phone}</p>
            </div>

            <div className="actions">
              <button className="link-btn" onClick={() => editAddress(a)}>Edit</button>
              <button className="link-btn" onClick={() => deleteAddress(a.AddressID)}>Delete</button>
            </div>
          </div>
        ))}

        {!showForm && (
          <div className="add-new-box" onClick={() => setShowForm(true)}>
            <span style={{ fontSize: 30 }}>+</span>
            <p>Add a new address</p>
          </div>
        )}

        {showForm && (
          <>
            <h3>{editId ? "Edit address" : "Add a new address"}</h3>

            <div className="address-form">
              {[
                ["FirstName", "First name"],
                ["LastName", "Last name"],
                ["Company", "Company"],
                ["Address1", "Address line 1"],
                ["Address2", "Address line 2"],
                ["City", "City"],
                ["Country", "Country"],
                ["PostalCode", "Postal / Zip code"],
                ["Phone", "Phone"],
              ].map(([key, labelText]) => (
                <div className="form-group" key={key}>
                  <label>{labelText}</label>
                  {key === "Country" ? (
                    <select name={key} value={form[key]} onChange={handleChange}>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
                  ) : (
                    <input name={key} value={form[key]} onChange={handleChange} />
                  )}
                </div>
              ))}
            </div>

            <label>
              <input
                type="checkbox"
                name="IsDefault"
                checked={form.IsDefault}
                onChange={handleChange}
              />
              Set as default address
            </label>

            <div style={{ marginTop: 20 }}>
              <button className="primary-btn" onClick={submitAddress}>
                {editId ? "Update address" : "Add address"}
              </button>
              <button className="link-btn" onClick={resetForm}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
