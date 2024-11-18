import { useEffect, useState } from "react";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { CategoriesServices } from "../../../../services/categoriesServices";
import { useAppSelector } from "../../../../hooks/hook";
import { RootState } from "../../../../store/store";
import CreateCategoryModal from "../CategoriesModal/CreateCategoryModal";
import EditCategoryModal from "../CategoriesModal/EditCategoryModal";
import CreateSubCategoryModal from "../CategoriesModal/CreateSubCategoryModal";
import EditSubCategoryModal from "../CategoriesModal/EditSubCategoryModal";

const ButtonsOfCategoriesTable = ({
  subCategorias,

  category,
  onEditCategory,
  onAddSubcategory,
  onEditSubcategory
}: {
  subCategorias: ICategorias[];
  categoryId: number;
  category: ICategorias; 
  onEditCategory: (category: ICategorias) => void; 
  onAddSubcategory: (parentCategory: ICategorias) => void; 
  onEditSubcategory: (subcategory: ICategorias, parentCategory: ICategorias) => void;
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <div>
      <button
        onClick={toggleMenu}
        style={{ backgroundColor: "#212529", color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
        </svg>
      </button>
      <button
        onClick={() => onEditCategory(category)} 
        style={{ backgroundColor: "#212529", color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil"
          viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
        </svg>
      </button>
      {menuVisible && (
        <div
          style={{
            backgroundColor: "#212529",
            color: "white",
            padding: "10px",
            zIndex: 10,
          }}>
          {subCategorias.map((sub) => (
            <div
              key={sub.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}>
              <span>{sub.denominacion}</span>
              <button
                onClick={() => onEditSubcategory(sub, category)}
                style={{
                  backgroundColor: "#212529",
                  color: "white",
                  marginLeft: "10px",
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1-.11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                </svg>
              </button>
            </div>
          ))}
          <button
            onClick={() => onAddSubcategory(category)} 
            style={{
              backgroundColor: "#313131",
              color: "white",
              marginTop: "10px",
              padding: "5px",
              borderRadius: "5px",
            }}>
            Agregar Subcategoría
          </button>
        </div>
      )}
    </div>
  );
};

export const Categories = () => {
  const [categories, setCategories] = useState<ICategorias[]>([]);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState<boolean>(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] =
    useState<boolean>(false);
  const [isCreateSubcategoryModalOpen, setIsCreateSubcategoryModalOpen] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategorias | null>(
    null
  );

  const [selectedSubCategory, setSubSelectedCategory] = useState<ICategorias | null>(
    null
  );
  const categoriesServices = new CategoriesServices(
    "http://190.221.207.224:8090/categorias"
  );
  const sucursalActiva = useAppSelector(
    (state: RootState) => state.conectCompanyBranchSlice.activeBranch
  );

  const fetchCategories = async () => {
    const categoriesData =
      await categoriesServices.getAllCategoriesPadreForBranch(
        sucursalActiva?.id || 0
      );
    setCategories(categoriesData);
  };

  useEffect(() => {
    fetchCategories();
  }, [sucursalActiva?.id]);
  return (
    <div className="activeScreenAdmin">
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          padding: "10px",
        }}>
        <button
          onClick={() => setIsCreateCategoryModalOpen(true)}
          style={{
            backgroundColor: "transparent",
            color: "red",
            border: "solid 1px red",
            borderRadius: "12px",
            padding: "5px",
          }}>
          Agregar Categoría Padre
        </button>
        {isCreateCategoryModalOpen && (
          <CreateCategoryModal
            onClose={() => setIsCreateCategoryModalOpen(false)}
            fetchCategories={fetchCategories}
          />
        )}
        {selectedCategory && isEditCategoryModalOpen && (
          <EditCategoryModal
            category={selectedCategory} 
            onClose={() => setIsEditCategoryModalOpen(false)}
            fetchCategories={fetchCategories} 
          />
        )}
        {selectedCategory && isCreateSubcategoryModalOpen && (
          <CreateSubCategoryModal
            onClose={() => setIsCreateSubcategoryModalOpen(false)} 
            fetchCategories={fetchCategories} 
            category={selectedCategory} 
          />
        )}
        {selectedCategory && selectedSubCategory && isEditCategoryModalOpen && (
          <EditSubCategoryModal
            onClose={() => setIsEditCategoryModalOpen(false)} 
            fetchCategories={fetchCategories} 
            subcategory={selectedSubCategory} 
            parentCategory={selectedCategory}
          />
        )}
      </div>
      {categories.map((category) => (
        <div key={category.id} className="categoryFatherDiv">
          <div className="categoryFatherTitle">{category.denominacion}</div>
          <ButtonsOfCategoriesTable
            subCategorias={category.subCategorias}
            categoryId={category.id}
            category={category} 
            onEditCategory={(category) => {
              setSelectedCategory(category); 
              setIsEditCategoryModalOpen(true);
            }}
            onAddSubcategory={(parentCategory) => {
              setSelectedCategory(parentCategory);
              setIsCreateSubcategoryModalOpen(true);

            }}
            onEditSubcategory={(subcategory, parentCategory) => {
              setSubSelectedCategory(subcategory); 
              setIsEditCategoryModalOpen(true);
              setSelectedCategory(parentCategory);
            }}
          />
        </div>
      ))}
    </div>
  );
};