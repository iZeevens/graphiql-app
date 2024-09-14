// import { useForm } from 'react-hook-form';

// import { IRestFullFormData } from '@/types/restFulgraphQlType';
// import '@testing-library/jest-dom';
// import { fireEvent, render, screen } from '@testing-library/react';

// import HeadersRestfull from './HeadersRESTfull';

// const HeadersRESTfullComponentWrapper = () => {
//   const {
//     control,
//     formState: { errors },
//   } = useForm<IRestFullFormData>({
//     defaultValues: {
//       headers: [],
//     },
//   });

// return (
// <HeadersRestfull control={control} urlChanged={jest.fn()} errors={errors} />
// );
// };

// describe('Headers RESTfull component tests', () => {
//   test('should be Add Header button in component', () => {
//     render(<HeadersRESTfullComponentWrapper />);

//     expect(screen.getByText('Add Header')).toBeInTheDocument();
//   });

//   test('Header Key input should be render then click to Add Header button', () => {
//     render(<HeadersRESTfullComponentWrapper />);

//     const addHeaderBtn = screen.getByText('Add Header');
//     fireEvent.click(addHeaderBtn);
//     expect(screen.getByLabelText('Header Key')).toBeInTheDocument();
//   });

//   test('Header Key input should be removed then click to Add Header button', () => {
//     render(<HeadersRESTfullComponentWrapper />);

//     const addHeaderBtn = screen.getByText('Add Header');
//     fireEvent.click(addHeaderBtn);

//     const closedHeaderBtn = screen.getByTestId('headerBtnClosed');
//     fireEvent.click(closedHeaderBtn);
//     expect(screen.queryByLabelText('Header Key')).not.toBeInTheDocument();
//   });
// });
