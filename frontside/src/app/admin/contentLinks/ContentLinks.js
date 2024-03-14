import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { CPopover, CButton } from "@coreui/react";
import ApiServices from "../../services/api.service";
import { ToastContainer, toast } from "react-toastify";
import TimeAgo from "timeago-react";
import { Trans,withTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
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
import CurrencyFormatter from "../../shared/CurrencyFormatter";

export class ContentLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      isDisable: false,
      page: 0,
      searchValue: "",
      rowsPerPage: 10,
      orderBy: "id",
      order: "desc",
      selectedRow: null,
      showPopover: false,
      min: 30,
      max: 200000,
      selectedCategory: [],
      selectedProductType: [],
      selectedTlds: [],
      category: [],
      projectType: [
        {
          id: 1,
          value: "Press Release",
          label: "Press Release",
        },
        {
          id: 2,
          value: "SEO",
          label: "SEO Content",
        },
        {
          id: 3,
          value: "Google",
          label: "Google Disavow",
        },
      ],
      tlds: [
        {
          id: 1,
          value: "com",
          label: "com",
        },
        {
          id: 2,
          value: "org",
          label: "org",
        },
        {
          id: 3,
          value: "edu",
          label: "edu",
        },
      ],
    };
  }

  gotoViewContentLink = (hash_id, event, index) => {
    const nonClickableTags = ["button", "svg", "path"];
    if (!nonClickableTags.includes(event.target.tagName.toLowerCase())) {
      this.props.history.push(`/admin/contentlinks/${hash_id}`);
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
    this.setState(
      {
        min: newValue[0],
        max: newValue[1],
      },
      this.updateFilterData
    );
  };

  handleReset = () => {
    this.setState(
      {
        min: 30,
        max: 200000,
        selectedCategory: [],
        selectedProductType: [],
        selectedTlds: [],
      },
      this.updateFilterData
    );
  };
  handleInputChange = (event, inputType) => {
    const inputValue = parseInt(event.target.value, 10);
    if (!isNaN(inputValue)) {
      this.setState(
        {
          [inputType]: inputValue,
        },
        this.updateFilterData
      );
    }
  };
  handleMultiSelectChange = (name, selectedOptions) => {
    this.setState({ [name]: selectedOptions }, this.updateFilterData);
  };
  handleOnSearch = (e) => {
    this.setState({ searchValue: e.target.value }, this.updateFilterData);
  };
  handleOpenContentDomain = (url) => {
    window.open("https://" + url, "_blank");
  };
  updateFilterData = () => {
    this.setState({
      isDisable: true,
    });
    const {
      selectedCategory,
      selectedProductType,
      selectedTlds,
      searchValue,
      min,
      max,
    } = this.state;
    const filterData = {
      category_id: selectedCategory.length
        ? selectedCategory.map((category) => category.id)
        : [],
      tld: selectedTlds.length ? selectedTlds.map((tld) => tld.value) : {},
      price: { min: min || "", max: max || "" },
      domain_name: searchValue,
    };
    this.fetchContentLinkData(filterData);
  };

  fetchContentLinkData(filter = null) {
    ApiServices.getAdminContentLinkList(filter).then(
      (res) => {
        if (res.data.status) {
          this.setState({
            rows: res.data.data,
            isDisable: false,
          });
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    );
  }

  componentDidMount() {
    this.fetchContentLinkData();

    ApiServices.getDomainCategoryList().then(
      (res) => {
        if (res.data.status) {
          const transformedData = res.data.data.map((category) => ({
            id: category.id,
            value: category.id,
            label: category.name,
          }));
          this.setState({
            category: transformedData,
          });
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    );
  }
  render() {
    const { t } =  this.props;
    const {
      min,
      rows,
      max,
      page,
      rowsPerPage,
      orderBy,
      order,
      isDisable,
      searchValue,
    } = this.state;

    const columns = [
      {
        id: "name",
        label: <Trans>Name</Trans>,
        height: 70,
        width: 345,
        sortable: false,
        renderCell: (row) => (
          <div style={{ display: "flex" }}>
            <button
              className="customBtn2 mr-2"
              onClick={() => this.handleOpenContentDomain(row.domain_name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="30"
                viewBox="0,0,256,256"
              >
                <g transform="">
                  <g
                    fillOpacity="0.6902"
                    fill="#000000"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                  >
                    <g
                      transform="scale(2,2)"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <path d="M84,11c-1.7,0 -3,1.3 -3,3c0,1.7 1.3,3 3,3h22.80078l-46.40039,46.40039c-1.2,1.2 -1.2,3.09922 0,4.19922c0.6,0.6 1.39961,0.90039 2.09961,0.90039c0.7,0 1.49961,-0.30039 2.09961,-0.90039l46.40039,-46.40039v22.80078c0,1.7 1.3,3 3,3c1.7,0 3,-1.3 3,-3v-30c0,-1.7 -1.3,-3 -3,-3zM24,31c-7.2,0 -13,5.8 -13,13v60c0,7.2 5.8,13 13,13h60c7.2,0 13,-5.8 13,-13v-45c0,-1.7 -1.3,-3 -3,-3c-1.7,0 -3,1.3 -3,3v45c0,3.9 -3.1,7 -7,7h-60c-3.9,0 -7,-3.1 -7,-7v-60c0,-3.9 3.1,-7 7,-7h45c1.7,0 3,-1.3 3,-3c0,-1.7 -1.3,-3 -3,-3z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
            <div className="block">
              <Typography className="fontBold600">{row.domain_name}</Typography>
              <Typography className="font-light text-sm customTextTable">
                {" "}
                {row.category.name}
              </Typography>
            </div>
          </div>
        ),
      },
      {
        id: "publisher",
        label: <Trans>Publisher</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) => <span>{row.publisher ? `${row.publisher.firstName} ${row.publisher.lastName}` : "N/A"}</span>,        
      },
      {
        id: "language",
        label: <Trans>Language</Trans>,
        width: 130,
        sortable: false,
        renderCell: (row) => (
          <div>
            {row.language === "en" && (
              <img src={require("../../../assets/images/US.svg")} alt="EN" />
            )}
            {row.language === "de" && (
              <img
                src={require("../../../assets/images/de.svg")}
                alt="DE"
                width={20}
              />
            )}
            &nbsp;&nbsp;{row.language.toUpperCase()}
          </div>
        ),
      },
      // {
      //   id: "rating",
      //   label: <Trans>Rating</Trans>,
      //   width: 130,
      //   align: "right",
      //   format: (value) => value.toLocaleString("en-US"),
      //   renderCell: (row) => (
      //     <div className="flex">
      //       <span
      //         className="text-yellow-700"
      //         style={{ transform: "scale(0.6)" }}
      //       >
      //         <svg
      //           className="mr-1"
      //           width={15}
      //           id="star"
      //           xmlns="http://www.w3.org/2000/svg"
      //           fill="#fbc02d"
      //           viewBox="0 0 24 24"
      //           stroke="currentColor"
      //           style={{ color: "#fbc02d" }}
      //         >
      //           <path
      //             strokeLinecap="round"
      //             strokeLinejoin="round"
      //             strokeWidth="2"
      //             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      //           />
      //         </svg>
      //         {row.contentData.rating}
      //       </span>
      //     </div>
      //   ),
      // },
      {
        id: "created_at",
        label: <Trans>Created</Trans>,
        align: "right",
        width: 90,
        sortable: false,
        renderCell: (row) => (
          <TimeAgo
            datetime={row.created_at}
            locale="en"
            style={{ fontSize: "10px" }}
          />
        ),
      },
      {
        id: "dr",
        label: "DR",
        align: "right",
        width: 90,
        renderCell: (row) => <span>{row.contentData.domain_rating}</span>,
      },
      // {
      //   id: "da",
      //   label: "DA",
      //   align: "right",
      //   width: 90,
      //   renderCell: (row) => <span>{row.contentData.authority}</span>,
      // },
      // {
      //   id: "svi",
      //   label: "SI",
      //   align: "right",
      //   width: 90,
      //   renderCell: (row) => <span>{row.contentData.visibility_index}</span>,
      // },
      // {
      //   id: "tf",
      //   label: "TF",
      //   align: "right",
      //   width: 90,
      //   renderCell: (row) => <span>{row.contentData.trust_flow}</span>,
      // },
      {
        id: "rd",
        label: "RD",
        align: "right",
        width: 90,
        renderCell: (row) => <span>{row.contentData.referring}</span>,
      },
      {
        id: "traffic",
        label: <Trans>TRAFFIC</Trans>,
        width: 90,
        align: "right",
        renderCell: (row) => <span>{row.contentData.traffic}</span>,
      },
      {
        id: "status",
        label: <Trans>Status</Trans>,
        width: 90,
        align: "right",
        renderCell: (row) => (
          <span
            className={`fontSize13 badge ${
              row.status ? "badge-success" : "badge-danger"
            }`}
          >
            {row.status ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        id: "price",
        label: <Trans>PRICE</Trans>,
        width: 160,
        align: "right",
        renderCell: (row) => (
          <span className="fontBold700 textColorCls">{CurrencyFormatter.formatCurrency(row.price)}</span>
        ),
      },
    ];

    return (
      <>
        <div className="ContentLinkHomePage">
          <div className="page-header">
            <h3 className="fontBold latterSpacing"><Trans>Backlinks List</Trans></h3>
          </div>
          <ToastContainer />
          <div className="row">
            <div className="col-lg-12 grid-margin">
              <div className="card mb-4 bRadius">
                <div className="card-body projectsCard">
                  <div className="d-flex justify-content-between MarketPlaceTab">
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
                            placeholder={t('Search backlink')}
                            className="form-control border-left-0 customSearch"
                            onChange={this.handleOnSearch}
                            value={searchValue}
                          />
                        </div>
                        <ReactMultiSelectCheckboxes
                          options={this.state.category}
                          value={this.selectedCategory}
                          onChange={(selectedOptions) =>
                            this.handleMultiSelectChange(
                              "selectedCategory",
                              selectedOptions
                            )
                          }
                          // placeholderButtonLabel="Categories"
                          placeholderButtonLabel={t('Categories')}
                        />
                        <ReactMultiSelectCheckboxes
                          options={this.state.projectType}
                          placeholderButtonLabel={t('Product Type')}
                          onChange={(selectedOptions) =>
                            this.handleMultiSelectChange(
                              "selectedProjectType",
                              selectedOptions
                            )
                          }
                        />
                        <ReactMultiSelectCheckboxes
                          options={this.state.tlds}
                          placeholderButtonLabel="TLDs"
                          value={this.selectedTlds}
                          onChange={(selectedOptions) =>
                            this.handleMultiSelectChange(
                              "selectedTlds",
                              selectedOptions
                            )
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
                            {min !== 30 || max !== 200000 ? (
                              <span className="css-1v99tuv">
                                <Trans>Prize</Trans>: {CurrencyFormatter.formatCurrency(min)} - {CurrencyFormatter.formatCurrency(max)}
                              </span>
                            ) : (
                              <span className="css-1v99tuv"><Trans>Prize</Trans></span>
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
                        <button
                          onClick={this.handleReset}
                          className="customBtn ml-3"
                          style={{ color: "red" }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Reset"
                          type="button"
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
                      </form>
                    </div>
                  </div>
                  <hr style={{ marginBottom: "0px" }} />
                  <div
                    className={`tableData ${isDisable ? "disabled-div" : ""}`}
                  >
                    <Paper style={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer style={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  className="text-uppercase"
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.sortable !== false ? (
                                    <TableSortLabel
                                      active={orderBy === column.id}
                                      direction={
                                        orderBy === column.id ? order : "asc"
                                      }
                                      onClick={() =>
                                        this.handleRequestSort(column.id)
                                      }
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
                            {this.stableSort(
                              rows,
                              this.getComparator(order, orderBy)
                            )
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row, index) => {
                                const isSelected =
                                  this.state.selectedRow === index;
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isSelected}
                                    onClick={(event) =>
                                      this.gotoViewContentLink(
                                        row.hash_id,
                                        event,
                                        index
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
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
                </div>
              </div>
            </div>
          </div>
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
          aria-labelledby="input-slider"
          step={1}
          min={0}
          max={200000}
        />
        <input
          className="form-control form-control inpRound"
          value={max}
          type="number"
          onChange={(e) => handleInputChange(e, "max")}
          aria-labelledby="input-slider"
          step={1}
          min={0}
          max={200000}
        />
      </div>
      <Slider
        value={[min, max]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={30}
        max={200000}
        style={{ color: "#ff9756" }}
      />
    </>
  );
};
// export default withRouter(ContentLinks);
export default withTranslation()(ContentLinks);