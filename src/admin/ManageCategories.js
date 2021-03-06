import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  deleteCategory,
  getCategories,
  getProducts,
} from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const { _id, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      // console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
    getProducts().then((data) => {
      //   console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  
// console.log(products)

  const deleteaCategory = (categoryId) => {
    deleteCategory(categoryId, _id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Manage all your categories here!" description="">
      <div className="container bg-info rounded p-2">
        <div className="row">
          {categories.map((category, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <Card className="mb-2">
                <Card.Header className="text-dark">{category.name}</Card.Header>
                <Button variant="success" className="p-1 m-1">
                  Update
                </Button>
                <Button
                  onClick={() => deleteaCategory(category._id)}
                  variant="danger"
                  className="p-1 m-1"
                >
                  Delete
                </Button>
              </Card>
            </div>
          ))}
        </div>
        <div className="m-3">
          <Button variant="light">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin/dashboard"
            >
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
