﻿using BcdLib.Components.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BcdLib.Components
{
    internal class BcdFormOptions
    {
        #region form properties

        /// <summary>
        /// The width of the form, in pixels
        /// </summary>
        public int Width { get; set; } = 520;

        /// <summary>
        /// Where the form is minimized
        /// </summary>
        public MinPosition MinPosition { get; set; } = MinPosition.RightBottom;

        /// <summary>
        /// form body's style
        /// </summary>
        public string BodyStyle { get; set; }

        /// <summary>
        /// Remove from DOM when closing. Default is true.
        /// If <c>DestroyOnClose = false</c>, be sure to use a global variable to accept the instance of BcdForm
        /// </summary>
        public bool DestroyOnClose { get; set; } = true;

        /// <summary>
        /// Unique identification, it will be used as the Id attribute of the form root DOM. If it is not defined, it will be generated by default
        /// </summary>
        public string Name { get; set; } = "Bcd-" + Guid.NewGuid();

        /// <summary>
        /// Allow header to be displayed. Default is true
        /// </summary>
        public bool EnableHeader { get; set; } = true;

        /// <summary>
        /// Allow Mask to be displayed. Default is false
        /// </summary>
        public bool ShowMask { get; set; }

        /// <summary>
        /// Whether to close the form when the mask is clicked, if ShowMask is true.
        /// </summary>
        public bool MaskClosable { get; set; } = true;

        /// <summary>
        /// the style of Mask, if <paramref name="ShowMask"/> is true.
        /// </summary>
        public string MaskStyle { get; set; }

        /// <summary>
        /// the title of form. Default value is BcdForm
        /// </summary>
        public string Title { get; set; } = "BcdForm";

        /// <summary>
        /// Allow minimization
        /// </summary>
        public bool MinimizeBox { get; set; } = true;

        /// <summary>
        /// Allow maximum
        /// </summary>
        public bool MaximizeBox { get; set; } = true;

        /// <summary>
        /// Allow drag
        /// </summary>
        public bool Draggable { get; set; }

        /// <summary>
        /// Drag is only allowed in the viewport, if <paramref name="Draggable"/> is true.
        /// </summary>
        public bool DragInViewport { get; set; } = true;

        #endregion
    }
}
