import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Placeholder } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, resetAddPostResponseData } from 'src/state/post/actions';
import { object, string } from 'yup';

interface IAddPostForm {
  title: string;
  body: string;
}

type AddPostProps = {
  onCancelClick: () => void;
};

const AddPost: React.FC<AddPostProps> = (addPostProps: AddPostProps) => {
  const dispatch = useDispatch();
  const { loading, addPostSuccess, addPostFailed } = useSelector(
    (state: ReduxStore) => ({
      addPostSuccess: state.post.addPostResponseData,
      loading: state.common.addPostLoading,
      addPostFailed: state.post.error,
    })
  );
  const [alert, setAlert] = useState({ type: '', message: '' });
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        title: '',
        body: '',
      },
      onSubmit: (values: IAddPostForm, actions) => {
        addNewPost(values, actions.resetForm);
      },
      validationSchema: object().shape({
        title: string().required('Please enter title'),
        body: string().required('Please enter body'),
      }),
    });

  const addNewPost = async (data: IAddPostForm, resetForm: Function) => {
    await dispatch(addPost(data));
    resetForm({});
  };

  useEffect(() => {
    if (addPostSuccess) {
      setAlert({
        type: 'success',
        message: 'Post added successfully',
      });
    }
    if (addPostFailed) {
      setAlert({
        type: 'error',
        message: 'Failed to add post',
      });
    }
  }, [addPostSuccess, addPostFailed]);

  return (
    <Form onSubmit={handleSubmit}>
      {alert && (alert.type === 'success' || alert.type === 'error') && (
        <Alert
          dismissible
          variant={alert.type}
          onClose={() => {
            dispatch(resetAddPostResponseData());
            setAlert({ type: '', message: '' });
          }}
        >
          {alert.message}
        </Alert>
      )}
      {loading && (
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      )}
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          name="title"
          value={values.title}
          type="text"
          placeholder="Enter title"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title && touched.title ? errors.title : ''}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBody">
        <Form.Label>Body</Form.Label>
        <Form.Control
          required
          as="textarea"
          name="body"
          rows={5}
          className="resize-none"
          value={values.body}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Form.Control.Feedback type="invalid">
          {errors.body && touched.body ? errors.body : ''}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        type="button"
        variant="outline-secondary"
        className="mr-2"
        onClick={() => addPostProps.onCancelClick()}
      >
        Cancel
      </Button>
      <Button type="submit" variant="primary">
        Add
      </Button>
    </Form>
  );
};

export default AddPost;
