import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useBuilderContext } from '../utils/builderContext';
import { useFitZoom } from '../utils/hooks';
import { usePropContext } from '../utils/propContext';

const getModeClass = mode => `${mode}Mode`;

const ReportWrapper = ({
  children,
  mode,
  pageCount,
}) => {
  const {
    isAllSlidesPanelOpen,
    isLeftPanelOpen,
    isRightPanelOpen,
    isSlidesPanelOpen,
    setIsLeftPanelOpen,
    setIsSlidesPanelOpen,
    setZoom,
  } = useBuilderContext();
  const { settings } = usePropContext();
  const decidedWhichPanelToOpen = useRef(false);

  useFitZoom({
    handler: setZoom,
    isModeCustomize: mode === 'customize',
    settings,
  });

  useEffect(() => {
    if (mode !== 'customize' || decidedWhichPanelToOpen.current) {
      return;
    }

    if (pageCount > 1) {
      if (isLeftPanelOpen) {
        setIsLeftPanelOpen(false);
      }
      setIsSlidesPanelOpen(true);
    } else {
      if (isSlidesPanelOpen) {
        setIsSlidesPanelOpen(false);
      }
      setIsLeftPanelOpen(true);
    }

    decidedWhichPanelToOpen.current = true;
  }, [mode, pageCount]);

  const wrapperClass = classNames(
    'jfReport',
    'f-height',
    'd-flex',
    getModeClass(mode),
    isLeftPanelOpen === true ? 'leftPaneIsActive' : '',
    isRightPanelOpen === true || isSlidesPanelOpen === true ? 'rightPaneIsActive' : '',
    isSlidesPanelOpen === true ? 'slidesPaneIsActive' : '',
    isAllSlidesPanelOpen === true ? 'allSlidesPaneIsActive' : '',
  );
  return (
    <div
      className={wrapperClass}
    >
      {children}
    </div>
  );
};

ReportWrapper.propTypes = {
  children: PropTypes.any,
  mode: PropTypes.string,
  pageCount: PropTypes.number,
};

ReportWrapper.defaultProps = {
  children: null,
  mode: '',
  pageCount: 0,
};

export default memo(ReportWrapper);
