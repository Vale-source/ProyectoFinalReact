carpeta/components:
|----->	carpeta/AsideCompany:
|	|
|	|----->	AsideCompany:
|	|	La funcion de este componente es poder mostrar el modal para agregar empresa. 
|	|	Contiene las funciones encargadas de guardar los datos en la store
|	|
|	|
|	|----->	ListCompany:
|		La funcion de este componente es renderizar las cards en el aside y contiene la logica para eliminar empresas
|
|----->	carpeta/modals:
	|
	|----->	AsideCompanyEditModal:
	|	Modal que se abre al querer editar la empresa, contiene toda la logica para 
	|	modificar los datos de una empresa, tiene los mismo verificadores que el component AsideCompany
	|
	|----->	AsideCompanyModal:
	|	Modal que se muestra al querer agregar una empresa
	|	
	|----->	AsideCompanyViewDataModal:
		Modal que se muestra al querer ver los datos de una empresa

carpeta/features:
|----->	carpeta/asideSlice:
	|	
	|----->	asideSlice:
		Slice encargado del manejo del aside. Contiene los reducers para agregar, eliminar y editar empresa
