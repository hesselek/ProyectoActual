Public Class FactCriterioCliente
    Implements IComparer(Of Factura)

    Public Function Compare(ByVal x As Factura, ByVal y As Factura) As Integer Implements System.Collections.Generic.IComparer(Of Factura).Compare

        Return x.Cliente.NIF.CompareTo(y.Cliente.NIF)

    End Function

End Class
