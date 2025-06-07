import "./category-item.css"
import Container from "react-bootstrap/esm/Container";

import { useContext, useState } from "react";
import Icon from "@mdi/react";
import { mdiPencilOutline, mdiClose, mdiPlus } from "@mdi/js";
import Button from "react-bootstrap/Button";

import { CategoryListContext } from "./category-list-provider";
import { TaskListContext } from "../task/task-list-provider";
import CategoryItemForm from "./category-item-form";
import CategoryItemDeleteDialog from "./category-item-delete-dialog";


function CategoryItem() {

  const [categoryItemFormData, setCategoryItemFormData] = useState();
  const [categoryItemDeleteDialog, setCategoryItemDeleteDialog] = useState();
  const { data } = useContext(CategoryListContext);
  const { selectedCategory, setSelectedCategory } = useContext(TaskListContext);

  const selectedCategoryObject = data?.itemList?.find(cat => cat.id === selectedCategory);
  
  return (
    
    <div className="category">
        {!!categoryItemFormData ? (
          <CategoryItemForm
            data={categoryItemFormData}
            onClose={() => setCategoryItemFormData()}
          />
        ) : null}
        {!!categoryItemDeleteDialog ? (
          <CategoryItemDeleteDialog
            data={categoryItemDeleteDialog}
            onClose={() => setCategoryItemDeleteDialog()}
          />
        ) : null}
        <Container className="d-flex justify-content-between align-items-center mb-2">
          <div>
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="ms-1"
            >
              <option value="none">none</option>
              {data?.itemList?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex align-items-center">
            <Button
              className="border-0 p-1 me-1"
              variant="outline-success"
              size="sm"
              onClick={() => setCategoryItemFormData({})}
            >
              <Icon path={mdiPlus} size={1} />
            </Button>
            {selectedCategory !== "none" && (
              <>
                <Button
                  className="border-0 p-1 me-1"
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCategoryItemFormData(selectedCategoryObject)}
                >
                  <Icon path={mdiPencilOutline} size={0.8} />
                </Button>
                <Button
                  className="border-0 p-1"
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setCategoryItemDeleteDialog(selectedCategoryObject)}
                >
                  <Icon path={mdiClose} size={0.8} />
                </Button>
              </>
            )}
          </div>
        </Container>
      </div>
  );
}

export default CategoryItem;
