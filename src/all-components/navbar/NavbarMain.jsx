import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import imgcentrbrand from '../../assets/imgages/centerbrand.png'
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
const navigation = [
    { name: 'HOME', to: '/', current: true },//এখানে শুধু / মানে homepage বুঝায় roter এ
    { name: 'SERVICE', to: '/service', current: false },
    { name: 'ABOUT US', to: '/about-us', current: false },
    { name: 'CANCEL TICKET', to: '/ticket-cancel', current: false },
    { name: 'CONTACT US', to: '/contact-us', current: false },
    { name: 'ALBUM', to: '/album', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavbarMain() {
    return (
        <div className='w-[96%] md:w-10/12 mx-auto'>
            <Disclosure as="nav" className="bg-[#cc0000]">
                <div className="mx-auto max-w-7xl px-2 ">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between md:hidden">
                            {/* Left: Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                            </DisclosureButton>

                            {/* Right: Brand logo */}
                            <div className="flex justify-end items-center z-50">
                                <Link to={'/'}>
                                    <img src={imgcentrbrand} alt="Brand Logo" className="w-36" />
                                </Link>
                            </div>
                            <div className="text-blue-600 font-bold text-4xl md:text-2xl block md:hidden">
                                <a href="https://www.facebook.com/rakib.al.muqtadir.2024/"><FaFacebookSquare /></a>
                            </div>
                        </div>
                        <div className=" hidden md:flex items-center justify-between w-full px-2 xl:px-12">
                            {/* বাম পাশে প্রথম তিনটি আইটেম */}
                            <div className="first-three-nav flex  xl:space-x-10 items-center">
                                {navigation.slice(0, 3).map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        className={
                                            item.current
                                                ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                                                : 'text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold'
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* মাঝখানে লোগো */}
                            <div className="center-brand flex justify-center z-50">
                                <img src={imgcentrbrand} alt="Brand Logo" className=" h-48 lg:h-60 w-auto" />
                            </div>

                            {/* ডান পাশে বাকি আইটেম */}
                            <div className="remaining-nav flex  xl:space-x-10 items-center">
                                {navigation.slice(3).map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        className={
                                            item.current
                                                ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                                                : 'text-white font-bold hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm'
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>



                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                to={item.to}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </div>
        
    )
}
