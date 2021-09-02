import get from 'lodash.get';
import React, { useEffect, useState } from 'react';
import { Placeholder } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

type Props = {
  userId: number;
  pageType: string;
  loadData: (userId: number, page: number) => void;
};

const PaginationLayout: React.FC<Props> = ({ userId, pageType, loadData }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  const loadingType = `${pageType}Loading`;

  const { loading, loadedData } = useSelector((state: ReduxStore) => ({
    loading: get(state, `common.${loadingType}`, false),
    loadedData: get(state, `${pageType}.data`, []),
  }));

  const loadPaginatedData = async () => {
    const el = document.querySelector('#scroll-box');
    if (el && !loading) {
      const scrollTop = el.scrollTop;
      await loadData(userId, pageNumber);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      el.scrollTo(0, scrollTop);
    }
  };

  useEffect(() => {
    if (inView) {
      loadPaginatedData();
    }
    // eslint-disable-next-line
  }, [inView]);

  return (
    <div ref={ref}>
      {(inView && !loading) || loadedData.length === 0 ? null : (
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      )}
    </div>
  );
};

export default PaginationLayout;
