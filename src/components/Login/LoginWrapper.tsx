import React from 'react';

interface Props {
    children: React.ReactNode;
}

const LoginWrapper = (props: Props) => {
    return (
        <>
            <div className="lg:flex">
                <div className="lg:w-1/2 xl:max-w-screen-sm">
                    <div className="py-12 bg-white flex justify-center lg:justify-start lg:px-12">
                        <div className="cursor-pointer flex items-center">The Pass Keeper</div>
                    </div>
                    {props.children}
                </div>
                <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
                    <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
                        {/* Right Space */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginWrapper;
