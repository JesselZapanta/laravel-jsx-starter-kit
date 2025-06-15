import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export default function MyPagination({ links, onPageChange }) {
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, i) => {
                    // Skip "..." manually to use PaginationEllipsis
                    if (link.label === '...') {
                        return (
                            <PaginationItem key={i}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    // Previous Button
                    if (link.label.includes('Previous')) {
                        return (
                            <PaginationItem key={i}>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) onPageChange(link.url);
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    // Next Button
                    if (link.label.includes('Next')) {
                        return (
                            <PaginationItem key={i}>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) onPageChange(link.url);
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    // Numbered links
                    return (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href="#"
                                isActive={link.active}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (link.url) onPageChange(link.url);
                                }}
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
};
