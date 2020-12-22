/*
The MIT License (MIT) (https://github.com/mu29/react-stepper/blob/HEAD/LICENSE)

Copyright (c) 2016 InJung Chung (https://github.com/mu29/react-stepper)
Copyright (c) 2020 Yi Liu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Step extends Component {
  constructor() {
    super()
    this.getStyles = this.getStyles.bind(this)
  }

  getStyles() {
    const {
      activeColor,
      completeColor,
      defaultColor,
      circleFontColor,
      activeTitleColor,
      completeTitleColor,
      defaultTitleColor,
      size,
      circleFontSize,
      titleFontSize,
      circleTop,
      titleTop,
      width,
      completeOpacity,
      activeOpacity,
      defaultOpacity,
      completeTitleOpacity,
      activeTitleOpacity,
      defaultTitleOpacity,
      barStyle,
      defaultBarColor,
      completeBarColor,
      defaultBorderColor,
      completeBorderColor,
      activeBorderColor,
      defaultBorderStyle,
      completeBorderStyle,
      activeBorderStyle,
      activeCircleFontColor,
      fontFamily,
      circleCursor,
      barHeight,
      onClick,
      completed,
      stepReached
    } = this.props

    return {
      step: {
        width: `${width}%`,
        display: 'table-cell',
        position: 'relative',
        paddingTop: circleTop,
      },
      circle: {
        width: size,
        height: size,
        margin: '0 auto',
        backgroundColor: defaultColor,
        borderRadius: '50%',
        textAlign: 'center',
        fontSize: circleFontSize,
        color: circleFontColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: defaultOpacity,
        borderWidth: defaultBorderColor ? 3 : 0,
        borderColor: defaultBorderColor,
        borderStyle: defaultBorderStyle,
        cursor: circleCursor,
      },
      activeCircle: {
        backgroundColor: activeColor,
        opacity: activeOpacity,
        borderWidth: activeBorderColor ? 3 : 0,
        borderColor: activeBorderColor,
        borderStyle: activeBorderStyle,
        cursor: circleCursor,
      },
      completedCircle: {
        backgroundColor: completeColor,
        opacity: completeOpacity,
        borderWidth: completeBorderColor ? 3 : 0,
        borderColor: completeBorderColor,
        borderStyle: completeBorderStyle,
        cursor: circleCursor,
      },
      index: {
        lineHeight: `${size + circleFontSize / 4}px`,
        color: circleFontColor,
        fontFamily: fontFamily,
        cursor: (completed || stepReached) && onClick ? 'pointer' : 'default',
      },
      activeIndex: {
        lineHeight: `${size + circleFontSize / 4}px`,
        color: activeCircleFontColor,
        fontFamily: fontFamily,
      },
      title: {
        marginTop: titleTop,
        fontSize: titleFontSize,
        fontWeight: '300',
        textAlign: 'center',
        display: 'block',
        color: defaultTitleColor,
        opacity: defaultTitleOpacity,
        fontFamily: fontFamily,
        cursor: 'default',
      },
      activeTitle: {
        color: activeTitleColor,
        opacity: activeTitleOpacity,
        fontFamily: fontFamily,
      },
      completedTitle: {
        color: completeTitleColor,
        opacity: completeTitleOpacity,
        fontFamily: fontFamily,
        cursor: onClick ? 'pointer' : 'default',
      },
      leftBar: {
        position: 'absolute',
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: barHeight || 1,
        borderTopColor: defaultBarColor,
        left: 0,
        right: '50%',
        marginRight: size / 2,
        opacity: defaultOpacity,
      },
      rightBar: {
        position: 'absolute',
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: barHeight || 1,
        borderTopColor: defaultBarColor,
        right: 0,
        left: '50%',
        marginLeft: size / 2,
        opacity: defaultOpacity,
      },
      completedBar: {
        borderTopStyle: barStyle,
        borderTopWidth: barHeight || 1,
        borderTopColor: completeBarColor,
        opacity: completeOpacity,
      },
    }
  }

  getInnerContent() {
    const { active, completed, checkIcon, index, onClick, stepReached } = this.props
    const styles = this.getStyles()
    
    const handleClick = e => onClick(index)

    if (active) {
      return (
        <span onClick={handleClick} style={styles.activeIndex}>
          {index + 1}
        </span>
      )
    }

    if (completed || stepReached) {
      if (completed && checkIcon) {
        return (
          <span onClick={handleClick} style={styles.index}>
            {checkIcon}
          </span>
        )
      }
      return (
        <span
          style={Object.assign({}, styles.index, {
            color: this.props.defaultCircleFontColor || styles.index.color,
          })}
          onClick={handleClick}
        >
          {index + 1}
        </span>
      )
    }

    return <span style={styles.index}>{index + 1}</span>
  }

  render() {
    const { title, active, completed, first, isLast } = this.props

    const styles = this.getStyles()
    const circleStyle = Object.assign(
      styles.circle,
      completed ? styles.completedCircle : {},
      active ? styles.activeCircle : {},
    )
    const titleStyle = Object.assign(
      styles.title,
      completed ? styles.completedTitle : {},
      active ? styles.activeTitle : {},
    )
    const leftStyle = Object.assign(
      styles.leftBar,
      active || completed ? styles.completedBar : {},
    )
    const rightStyle = Object.assign(
      styles.rightBar,
      completed ? styles.completedBar : {},
    )

    return (
      <div style={styles.step}>
        <div style={circleStyle}>{this.getInnerContent()}</div>
        {completed ? (
          <div style={titleStyle}>
            {title}
          </div>
        ) : (
          <div style={titleStyle}>{title}</div>
        )}
        {!first && <div style={leftStyle} />}
        {!isLast && <div style={rightStyle} />}
      </div>
    )
  }
}

Step.defaultProps = {
  activeColor: '#5096FF',
  completeColor: '#5096FF',
  defaultColor: '#E0E0E0',
  activeTitleColor: '#000',
  completeTitleColor: '#000',
  defaultTitleColor: '#757575',
  circleFontColor: '#FFF',
  size: 32,
  circleFontSize: 16,
  titleFontSize: 16,
  circleTop: 24,
  titleTop: 8,
  defaultBarColor: '#E0E0E0',
  barStyle: 'solid',
  borderStyle: 'solid',
}

Step.propTypes = {
  width: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
  completeColor: PropTypes.string,
  defaultColor: PropTypes.string,
  activeTitleColor: PropTypes.string,
  completeTitleColor: PropTypes.string,
  defaultTitleColor: PropTypes.string,
  circleFontColor: PropTypes.string,
  size: PropTypes.number,
  circleFontSize: PropTypes.number,
  titleFontSize: PropTypes.number,
  circleTop: PropTypes.number,
  titleTop: PropTypes.number,
  title: PropTypes.string,
  index: PropTypes.number,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  first: PropTypes.bool,
  isLast: PropTypes.bool,
  completeOpacity: PropTypes.string,
  activeOpacity: PropTypes.string,
  defaultOpacity: PropTypes.string,
  completeTitleOpacity: PropTypes.string,
  activeTitleOpacity: PropTypes.string,
  defaultTitleOpacity: PropTypes.string,
  barStyle: PropTypes.string,
  defaultBarColor: PropTypes.string,
  completeBarColor: PropTypes.string,
  defaultBorderColor: PropTypes.string,
  completeBorderColor: PropTypes.string,
  activeBorderColor: PropTypes.string,
  defaultBorderStyle: PropTypes.string,
  completeBorderStyle: PropTypes.string,
  activeBorderStyle: PropTypes.string,
}
