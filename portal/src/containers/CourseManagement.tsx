import React from "react";
import { FormattedMessage } from "react-intl";
import { Header } from "semantic-ui-react";
import EditCourseModal from "../components/EditCourseModal";
import EditOpenedCourseModal from "../components/EditOpenedCourseModal";
import Table from "../components/Table";
import { useCourseSearch } from "./CourseSearch";

const CourseManagement: React.FC = () => {
  const {
    loading,
    error,
    currentPage,
    totalPages,
    courseList,
    searchBarItems,
    tableColumnOptions,
    editCourseModalOptions,
    editOpenedCourseModalOptions,
    onSearch,
    onClearFilter,
    onRenderTableRow,
    onChangePage,
    onSaveEditCourseModal,
    onSaveEditOpenedCourseModal,
  } = useCourseSearch();

  return (
    <>
      <Header as="h1">
        <FormattedMessage id="CourseManagement.title" />
      </Header>
      <Table
        loading={loading}
        searchBarItems={searchBarItems}
        onSearch={onSearch}
        onClearFilter={onClearFilter}
        columnOptions={tableColumnOptions}
        tableData={courseList ?? []}
        onRenderRow={onRenderTableRow}
        showPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onChangePage}
        showHeaderButton
        headerButtonLabelID="CourseManagement.table.header.add-button.label"
        onClickHeaderButton={editCourseModalOptions.onOpenCreateCourseModal}
      />
      <EditCourseModal
        loading={loading}
        error={error}
        {...editCourseModalOptions}
        course={editCourseModalOptions.currentCourse}
        onSave={onSaveEditCourseModal}
        isOpen={editCourseModalOptions.isEditCourseModalOpen}
        onClose={editCourseModalOptions.onCloseEditCourseModal}
      />
      <EditOpenedCourseModal
        loading={loading}
        error={error}
        {...editOpenedCourseModalOptions}
        onSave={onSaveEditOpenedCourseModal}
      />
    </>
  );
};

export default CourseManagement;
