
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Categories } from '../Categories/CategoriesTable/CategoriesTable';
import { Products } from '../Products/ProductsTable/ProductsTable';
import Allergens from '../Allergens/AllergensTable/AllergensTable';



const BodyAdmin: React.FC = () => {
  const componenteActual = useSelector((state: RootState) => state.componente.componenteActual);

  const renderizarContenido = () => {
    switch (componenteActual) {
      case 'Categorias':
        return <Categories/>;
      case 'Productos':
        return <Products/>;
      case 'Alergenos':
        return <Allergens/>;
      default:
        return <div className='backgroundAdmin'></div>;
    }
  };

  return (
    <div className="backgroundAdmin">
      {renderizarContenido()}
    </div>
  );
};

export default BodyAdmin;
