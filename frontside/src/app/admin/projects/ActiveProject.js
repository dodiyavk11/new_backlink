import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { CPopover, CButton } from "@coreui/react";
import {
  Typography,
  Slider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
export class ActiveProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      orderBy: "name",
      order: "asc",
      selectedRow: null,
      orderData: [],
      showPopover: false,
      min: 30,
      max: 2000,
      dMin: 0,
      dMax: 94,
      daMin: 0,
      viMax: 20,
      viMin: 0,
      daMax: 96,
      tMin: 0,
      tMax: 84,
      trMin: 0,
      trMax: 1000000,
      rdMin: 0,
      rdMax: 50000,
      rangeValue: 50,
      selectedCategory: [],
      selectedProductType: [],
      selectedTlds: [],
      isMoreFilter: false,
      status: [
        {
          id: 1,
          label: "Pending",
        },
        {
          id: 2,
          label: "In Progress",
        },
        {
          id: 3,
          label: "Completed",
        },
        {
          id: 4,
          label: "Cancelled",
        },
        {
          id: 5,
          label: "Rajected",
        },
        {
          id: 6,
          label: "Missing Details",
        },
      ],
      projectType: [
        {
          id: 1,
          label: "Press Release",
        },
        {
          id: 2,
          label: "SEO Content",
        },
        {
          id: 3,
          label: "Google Disavow",
        },
      ],
      tlds: [
        {
          id: 1,
          label: "com",
        },
        {
          id: 2,
          label: "org",
        },
        {
          id: 3,
          label: "edu",
        },
      ],
      objectArray: [
        { key: "Option 1", cat: "Group 1" },
        { key: "Option 2", cat: "Group 1" },
        { key: "Option 3", cat: "Group 1" },
        { key: "Option 4", cat: "Group 2" },
        { key: "Option 5", cat: "Group 2" },
        { key: "Option 6", cat: "Group 2" },
        { key: "Option 7", cat: "Group 2" },
      ],
    };
  }

  // Datatable start
  handleRowClick = (event, index) => {
    if (event.target.tagName === "TD") {
      this.setState({ selectedRow: index });
    }
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 });
  };

  handleRequestSort = (property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({
      orderBy: property,
      order: isAsc ? "desc" : "asc",
    });
  };

  getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => b[orderBy] - a[orderBy]
      : (a, b) => a[orderBy] - b[orderBy];
  };

  stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };
  // Datatable End

  handleSliderChange = (event, newValue) => {
    this.setState({
      min: newValue[0],
      max: newValue[1],
    });
  };
  handleSliderChangeD = (event, newValue) => {
    this.setState({
      dMin: newValue[0],
      dMax: newValue[1],
    });
  };
  handleSliderChangeDA = (event, newValue) => {
    this.setState({
      daMin: newValue[0],
      daMax: newValue[1],
    });
  };
  handleSliderChangeVI = (event, newValue) => {
    this.setState({
      viMin: newValue[0],
      viMax: newValue[1],
    });
  };
  handleSliderChangeTF = (event, newValue) => {
    this.setState({
      tMin: newValue[0],
      tMax: newValue[1],
    });
  };
  handleSliderChangeTR = (event, newValue) => {
    this.setState({
      trMin: newValue[0],
      trMax: newValue[1],
    });
  };
  handleSliderChangeRD = (event, newValue) => {
    this.setState({
      rdMin: newValue[0],
      rdMax: newValue[1],
    });
  };
  handleReset = () => {
    this.setState({
      min: 30,
      max: 2000,
      dMax: 96,
      dMin: 0,
      viMax: 96,
      viMin: 0,
      daMax: 96,
      tMin: 0,
      tMax: 84,
      trMin: 0,
      trMax: 1000000,
      rdMin: 0,
      rdMax: 50000,
      selectedCategory: [],
      selectedProductType: [],
      selectedTlds: [],
    });
  };
  handleInputChange = (event, inputType) => {
    const inputValue = parseInt(event.target.value, 10);
    if (!isNaN(inputValue)) {
      this.setState({
        [inputType]: inputValue,
      });
    }
  };
  toggleDivVisibility = () => {
    this.setState((prevState) => ({
      isMoreFilter: !prevState.isMoreFilter,
    }));
  };
  render() {
    const {
      min,
      max,
      dMin,
      dMax,
      daMin,
      daMax,
      viMin,
      viMax,
      tMin,
      tMax,
      trMin,
      trMax,
      rdMin,
      rdMax,
      page,
      rowsPerPage,
      orderBy,
      order,
    } = this.state;
    return (
      <>
        {/* <div className="d-flex justify-content-between MarketPlaceTab">
          <div className="float-left flex">
            <form className="form-inline">
              <div className="input-group input-focus mr-2">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white customSearchIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </span>
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="form-control border-left-0 customSearch"
                />
              </div>
              <ReactMultiSelectCheckboxes
                options={this.state.status}
                value={this.selectedCategory}
                onChange={(selectedOptions) =>
                  this.setState({ selectedCategory: selectedOptions })
                }
                placeholderButtonLabel="Categories"
              />
              <ReactMultiSelectCheckboxes
                options={this.state.projectType}
                placeholderButtonLabel="Product Type"
              />
              <ReactMultiSelectCheckboxes
                options={this.state.tlds}
                placeholderButtonLabel="TLDs"
                value={this.selectedTlds}
                onChange={(selectedOptions) =>
                  this.setState({ selectedTlds: selectedOptions })
                }
              />
              <CPopover
                // trigger="focus"
                content={
                  <PriceRangeSlider
                    min={this.state.min}
                    max={this.state.max}
                    handleSliderChange={this.handleSliderChange}
                    handleInputChange={this.handleInputChange}
                  />
                }
                placement="bottom"
              >
                <CButton className="css-1r4vtzz custamFilterBtn">
                  {min !== 30 || max !== 2000 ? (
                    <span className="css-1v99tuv">
                      Prize: ${min} - ${max}
                    </span>
                  ) : (
                    <span className="css-1v99tuv">Prize</span>
                  )}
                  <span className="css-1gpjby2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      focusable="false"
                      role="presentation"
                    >
                      <path
                        d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
                        fill="currentColor"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </CButton>
              </CPopover>
            </form>
          </div>
          <div className="float-right flex">
            <button
              className="btn btn-primary btn btn-rounded custamFilterBtn btn-sm"
              onClick={this.toggleDivVisibility}
            >
              <svg
                width={20}
                id="adjustments"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              More Filters
            </button>
            <button
              className="customBtn ml-2"
              data-toggle="tooltip"
              data-placement="top"
              title="Show only revealed domain"
            >
              <svg
                width={24}
                id="eye"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <button
              className="customBtn ml-3"
              data-toggle="tooltip"
              data-placement="top"
              title="Show only favorites"
            >
              <svg
                width={24}
                id="heart"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              onClick={this.handleReset}
              className="customBtn ml-3"
              style={{ color: "red" }}
              data-toggle="tooltip"
              data-placement="top"
              title="Reset"
            >
              <svg
                width={24}
                id="trash"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {this.state.isMoreFilter && (
          <div className="moreFilter">
            <div className="row">
              <div className="col-sm-4">
                <div className="my-4 d-flex flex-row justify-content-start">
                  <img
                    alt="Metrics"
                    src={require("../../../assets/images/project/ahrefs.svg")}
                    className="rounded mr-4"
                    style={{ width: "1.5rem" }}
                  />
                  <Typography>Domain Rating</Typography>
                </div>
                <div>
                  <Slider
                    value={[dMin, dMax]}
                    onChange={this.handleSliderChangeD}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={94}
                    style={{ color: "#ff9756" }}
                  />
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="mb-2"
                  >
                    <input
                      className="form-control form-control inpRound mr-2"
                      value={dMin}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "dMin")}
                      min={0}
                      max={94}
                    />
                    <input
                      className="form-control form-control inpRound"
                      value={dMax}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "dMax")}
                      min={0}
                      max={94}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="my-4 d-flex flex-row justify-content-start">
                  <img
                    alt="Metrics"
                    src={require("../../../assets/images/project/moz.svg")}
                    className="rounded mr-4"
                    style={{ width: "1.5rem" }}
                  />
                  <Typography>Domain Authority</Typography>
                </div>
                <div>
                  <Slider
                    value={[daMin, daMax]}
                    onChange={this.handleSliderChangeDA}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={96}
                    style={{ color: "#ff9756" }}
                  />
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="mb-2"
                  >
                    <input
                      className="form-control form-control inpRound mr-2"
                      value={daMin}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "daMin")}
                      min={0}
                      max={96}
                    />
                    <input
                      className="form-control form-control inpRound"
                      value={daMax}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "daMax")}
                      min={0}
                      max={96}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="my-4 d-flex flex-row justify-content-start">
                  <img
                    alt="Metrics"
                    src={require("../../../assets/images/project/metrics.svg")}
                    className="rounded mr-4"
                    style={{ width: "1.5rem" }}
                  />
                  <Typography>Visibility Index</Typography>
                </div>
                <div>
                  <Slider
                    value={[viMin, viMax]}
                    onChange={this.handleSliderChangeVI}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={20}
                    style={{ color: "#ff9756" }}
                  />
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="mb-2"
                  >
                    <input
                      className="form-control form-control inpRound mr-2"
                      value={viMin}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "viMin")}
                      min={0}
                      max={20}
                    />
                    <input
                      className="form-control form-control inpRound"
                      value={viMax}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "viMax")}
                      min={0}
                      max={20}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-sm-4">
                <div className="my-4 d-flex flex-row justify-content-start">
                  <img
                    alt="Metrics"
                    src={require("../../../assets/images/project/majestic.svg")}
                    className="rounded mr-4"
                    style={{ width: "1.5rem" }}
                  />
                  <Typography>Trust Flow</Typography>
                </div>
                <div>
                  <Slider
                    value={[tMin, tMax]}
                    onChange={this.handleSliderChangeTF}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={84}
                    style={{ color: "#ff9756" }}
                  />
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="mb-2"
                  >
                    <input
                      className="form-control form-control inpRound mr-2"
                      value={tMin}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "tMin")}
                      min={0}
                      max={84}
                    />
                    <input
                      className="form-control form-control inpRound"
                      value={tMax}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "tMax")}
                      min={0}
                      max={84}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="my-4 d-flex flex-row justify-content-start">
                  <img
                    alt="Metrics"
                    src={require("../../../assets/images/project/ahrefs.svg")}
                    className="rounded mr-4"
                    style={{ width: "1.5rem" }}
                  />
                  <Typography>Traffic</Typography>
                </div>
                <div>
                  <Slider
                    value={[trMin, trMax]}
                    onChange={this.handleSliderChangeTR}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={1000000}
                    style={{ color: "#ff9756" }}
                  />
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="mb-2"
                  >
                    <input
                      className="form-control form-control inpRound mr-2"
                      value={trMin}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "trMin")}
                      min={0}
                      max={1000000}
                    />
                    <input
                      className="form-control form-control inpRound"
                      value={trMax}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "trMax")}
                      min={0}
                      max={1000000}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="my-4 d-flex flex-row justify-content-start">
                  <img
                    alt="Metrics"
                    src={require("../../../assets/images/project/ahrefs.svg")}
                    className="rounded mr-4"
                    style={{ width: "1.5rem" }}
                  />
                  <Typography>Referring Domains</Typography>
                </div>
                <div>
                  <Slider
                    value={[rdMin, rdMax]}
                    onChange={this.handleSliderChangeRD}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={50000}
                    style={{ color: "#ff9756" }}
                  />
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="mb-2"
                  >
                    <input
                      className="form-control form-control inpRound mr-2"
                      value={rdMin}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "rdMin")}
                      min={0}
                      max={50000}
                    />
                    <input
                      className="form-control form-control inpRound"
                      value={rdMax}
                      type="number"
                      onChange={(e) => this.handleInputChange(e, "rdMax")}
                      min={0}
                      max={50000}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <hr style={{ marginBottom: "0px" }} /> */}
        <div className="tableData">
          <Paper>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell className="text-uppercase"
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.sortable !== false ? (
                          <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : "asc"}
                            onClick={() => this.handleRequestSort(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                        ) : (
                          <span>{column.label}</span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.stableSort(rows, this.getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isSelected = this.state.selectedRow === index;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                          selected={isSelected}
                          onClick={(event) => this.handleRowClick(event, index)}
                          style={
                            isSelected
                              ? { backgroundColor: "rgba(30, 41, 59, 0.12)" }
                              : {}
                          }
                        >
                          {columns.map((column) => (
                            <TableCell
                              className="fontBold600"
                              key={column.id}
                              align={column.align}
                            >
                              {column.renderCell
                                ? column.renderCell(row)
                                : column.format &&
                                  typeof row[column.id] === "number"
                                ? column.format(row[column.id])
                                : row[column.id]}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </>
    );
  }
}
const PriceRangeSlider = (props) => {
  const { min, max, handleSliderChange, handleInputChange } = props;
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }} className="mb-2">
        <input
          className="form-control form-control inpRound mr-2"
          value={min}
          type="number"
          onChange={(e) => handleInputChange(e, "min")}
          ariaLabelledby="input-slider"
          step={1}
          min={0}
          max={100}
        />
        <input
          className="form-control form-control inpRound"
          value={max}
          type="number"
          onChange={(e) => handleInputChange(e, "max")}
          ariaLabelledby="input-slider"
          step={1}
          min={0}
          max={100}
        />
      </div>
      <Slider
        value={[min, max]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={30}
        max={2000}
        style={{ color: "#ff9756" }}
      />
    </>
  );
};
const columns = [
  {
    id: "name",
    label: "Name",
    height: 70,
    width: 345,
    sortable: false,
    renderCell: (row) => (
      <div style={{ display: "flex" }}>
        <button className="customBtn2 mr-2">
          <svg
            width={24}
            id="lock-closed"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </button>
        <div className="block">
          <Typography className="fontBold600">{row.name}</Typography>
          <Typography className="font-light text-sm customTextTable">
            {" "}
            sdfsdfsdfsdfsdfsdfsdf
          </Typography>
        </div>
      </div>
    ),
  },
  {
    id: "language",
    label: "Language",
    width: 130,
    sortable: false,
    renderCell: (row) => (
      <div>
        <img src={require("../../../assets/images/US.svg")} /> EN
      </div>
    ),
  },
  {
    id: "rating",
    label: "Rating",
    width: 130,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
    renderCell: (row) => (
      <div className="flex">
        <span className="text-yellow-700" style={{ transform: "scale(0.6)" }}>
          <svg
            className="mr-1"
            width={15}
            id="star"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fbc02d"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: "#fbc02d" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          {row.rating}
        </span>
      </div>
    ),
  },
  {
    id: "dr",
    label: "DR",
    align: "right",
    width: 90,
  },
  {
    id: "da",
    label: "DA",
    align: "right",
    width: 90,
  },
  {
    id: "traffic",
    label: "TRAFFIC",
    width: 90,
    align: "right",
  },
  {
    id: "price",
    label: "PRICE",
    width: 160,
    align: "right",
  },
  {
    id: "aciton",
    label: "",
    width: 160,
    align: "right",
    sortable: false,
    renderCell: (row) => (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          fill="currentColor"
          className="bi bi-bag"
          viewBox="0 0 16 16"
          style={{ color: "#757575c9", fontWeight: "bold" }}
        >
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
        </svg>
        <svg
          width={22}
          className="ml-2"
          id="heart"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          style={{ color: "#757575c9", fontWeight: "bold" }}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
    ),
  },
];

const rows = [
  createData(1, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
  createData(2, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
  createData(3, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
  createData(4, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
  createData(5, "****.net", "en", 3.5, 65, 89, 89565, "$2323"),
  createData(6, "****.net", "AU", 3.5, 65, 89, 89565, "$2323"),
  createData(7, "****.net", "DE", 3.5, 65, 89, 89565, "$2323"),
  createData(8, "****.net", "IE", 3.5, 65, 89, 89565, "$2323"),
  createData(9, "****.net", "MX", 3.5, 65, 89, 89565, "$2323"),
  createData(10, "****.net", "JP", 3.5, 65, 89, 89565, "$2323"),
  createData(11, "****.net", "FR", 3.5, 65, 89, 89565, "$2323"),
  createData(12, "****.net", "GB", 3.5, 65, 89, 89565, "$2323"),
  createData(13, "****.net", "RU", 3.5, 65, 89, 89565, "$2323"),
  createData(14, "****.net", "NG", 3.5, 65, 89, 89565, "$2323"),
  createData(15, "****.net", "BR", 3.5, 65, 89, 89565, "$2323"),
];

function createData(id, name, language, rating, dr, da, traffic, price) {
  return { id, name, language, rating, dr, da, traffic, price };
}
export default withRouter(ActiveProjects);
