import { useDispatch } from 'react-redux';
import { setComponenteActual } from '../../store/slices/componentSlice';


const AsideAdmin: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="asideAdmin">
      <h2>Administración</h2>
      <button onClick={() => dispatch(setComponenteActual('Categorias'))}>Categorías</button>
      <button onClick={() => dispatch(setComponenteActual('Productos'))}>Productos</button>
      <button onClick={() => dispatch(setComponenteActual('Alergenos'))}>Alérgenos</button>
    </div>
  );
};

export default AsideAdmin;
