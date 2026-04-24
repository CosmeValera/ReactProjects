You can see self-explanatory code in `src/App.js` with examples of memo and useMemo. Anyway here's a brief explanation.

## EXPLANATION memo vs useMemo:
React.memo es un componente de alto nivel (o H.O.C — High Order Component en inglés), por lo tanto, siempre recibirá un componente de React como primer argumento, lo memorizará y utilizará las props para condicionar su renderizado. Por su parte, useMemo es un hook de React que recibe una función.

## Ventajas y desventajas entre ambos: 
1. React.memo puede ser utilizado fuera de componentes de React. useMemo, al ser un hook, solo puede ser utilizado dentro de un componente funcional de React.
2. React.memo permite comparar las props del renderizado anterior vs las props del nuevo renderizado y crear condicionales a nuestro criterio para decidir cuando actualizar el componente. useMemo solo se actualizará cuando alguna de sus haya cambiado.
3. useMemo puede recibir funciones y memorizar el resultado de estas, React.memo solo memoriza componentes de React. In general memo/useMemo are recommended only for heavy components with a lot of logic.

A reccomended approach for lighter components is to use props.