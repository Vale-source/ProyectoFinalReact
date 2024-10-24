
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Categories } from '../Categories/Categories';
import { Products } from '../Products/Products';
import { Allergens } from '../Allergens/Allergens';

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
