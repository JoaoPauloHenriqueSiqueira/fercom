@if ($paginator->hasPages())


    <ul class="pagination justify-content-center top20 wow fadeInUp" data-wow-delay="400ms">

        {{-- Previous Page Link --}}


        @if ($paginator->onFirstPage())


            <li class="page-item disabled"><i class="material-icons">chevron_left</i></li>


        @else


            <li class="waves-effect page-item"><a class="page-link" href="{{ $paginator->previousPageUrl() }}"><i class="material-icons">chevron_left</i></a></li>


        @endif



        {{-- Pagination Elements --}}


        @foreach ($elements as $element)


            {{-- "Three Dots" Separator --}}


            @if (is_string($element))


                <li class="disabled page-item">{{ $element }}</li>


            @endif



            {{-- Array Of Links --}}


            @if (is_array($element))


                @foreach ($element as $page => $url)


                    @if ($page == $paginator->currentPage())


                        <li class="active page-item">


                            <a class="page-link">{{ $page }}</a>


                        </li>


                    @else


                        <li class="waves-effect page-item"><a class="page-link" href="{{ $url }}">{{ $page }}</a></li>


                    @endif


                @endforeach


            @endif


        @endforeach



        {{-- Next Page Link --}}


        @if ($paginator->hasMorePages())


            <li class="waves-effect page-item"><a class="page-link" href="{{ $paginator->nextPageUrl() }}"><i class="material-icons">chevron_right</i></a></li>


        @else


            <li class="disabled page-item"><a class="page-link" href="{{ $paginator->nextPageUrl() }}"><i class="material-icons">chevron_right</i></a></li>


        @endif


    </ul>




@endif