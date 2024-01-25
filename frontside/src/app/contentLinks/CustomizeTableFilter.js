import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../assets/custom.css";
export class TableFilter extends Component {
  handleCheckboxChange = (columnName, isChecked) => {
    this.props.onColumnVisibilityChange(columnName, isChecked);
  };

  render() {
    const { columnVisibility } = this.props;
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Language</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={columnVisibility.language}
              onChange={(e) =>
                this.handleCheckboxChange("language", e.target.checked)
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Rating</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={columnVisibility.rating}
              onChange={(e) =>
                this.handleCheckboxChange("rating", e.target.checked)
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4">Ahrefs Domain Rating</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={columnVisibility.dr}
              onChange={(e) =>
                this.handleCheckboxChange("dr", e.target.checked)
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Moz Domain Authority</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={columnVisibility.da}
              onChange={(e) =>
                this.handleCheckboxChange("da", e.target.checked)
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 pull-left text-nowrap">
            Sistrix Visibility Index
          </span>
          <label className="switch pull-right">
            <input
              type="checkbox"
              checked={columnVisibility.svi}
              onChange={(e) =>
                this.handleCheckboxChange("svi", e.target.checked)
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Majestic Trustflow</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={columnVisibility.tf}
              onChange={(e) =>
                this.handleCheckboxChange("tf", e.target.checked)
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Ahrefs Referring Domains</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={columnVisibility.rd}
              onChange={(e) =>
                this.handleCheckboxChange("rd", e.target.checked)
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Traffic</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={columnVisibility.traffic}
              onChange={(e) =>
                this.handleCheckboxChange("traffic", e.target.checked)
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <span className="mr-4 text-nowrap">Price</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={columnVisibility.price}
              onChange={(e) =>
                this.handleCheckboxChange("price", e.target.checked)
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
      </>
    );
  }
}
export default withRouter(TableFilter);
