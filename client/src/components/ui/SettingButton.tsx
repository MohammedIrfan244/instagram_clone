interface SettingButtonProps {
    onClick: () => void;
    style: string;
}

function SettingButton({ onClick, style }: SettingButtonProps): JSX.Element {
    return (
        <button
            className={style}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 511.999"
                className="w-6 h-6"
            >
                <path
                    className="fill-white"
                    d="M308.407 37.815a222.645 222.645 0 0164.785 26.879l.597-.603c14.398-14.392 37.948-14.398 52.34 0l21.78 21.78c14.392 14.392 14.392 37.942 0 52.34l-.651.645a222.91 222.91 0 0126.781 64.743l.95-.006c20.355.006 37.011 16.655 37.011 37.011v30.798c0 20.355-16.656 37.011-37.011 37.011h-1.017a222.844 222.844 0 01-26.836 64.615l.773.766c14.392 14.398 14.392 37.949 0 52.347l-21.78 21.773c-14.392 14.398-37.948 14.398-52.34 0l-.785-.779.109-.109a222.945 222.945 0 01-64.773 26.854h.067v1.108c0 20.355-16.655 37.011-37.005 37.011h-30.804c-20.356 0-37.005-16.656-37.005-37.011v-1.108h.012a222.646 222.646 0 01-64.627-26.769l.012.012-.779.785c-14.398 14.392-37.948 14.392-52.34 0l-21.78-21.779c-14.398-14.392-14.392-37.943 0-52.341l.749-.742a222.952 222.952 0 01-26.836-64.633h-.993C16.65 308.413 0 291.757 0 271.402v-30.798c-.006-20.356 16.65-37.005 37.011-37.011l.901.006a222.893 222.893 0 0126.8-64.761l-.621-.621c-14.398-14.398-14.392-37.948 0-52.34l21.78-21.78c14.386-14.398 37.936-14.392 52.34 0l.585.597a222.962 222.962 0 0164.797-26.885v-.798C203.593 16.656 220.242 0 240.598 0h30.804c20.35 0 37.005 16.656 37.005 37.011v.804zm-52.413 50.453c92.638 0 167.731 75.094 167.731 167.732 0 92.637-75.093 167.731-167.731 167.731-92.638 0-167.731-75.094-167.731-167.731 0-92.638 75.093-167.732 167.731-167.732z"
                />
            </svg>
        </button>
    );
}

export default SettingButton;
